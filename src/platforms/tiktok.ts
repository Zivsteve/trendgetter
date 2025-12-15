import axios from 'axios';
import { JSDOM } from 'jsdom';
import { browser } from '~/.';

/**
 * Fetches trending videos from TikTok Creative Center.
 *
 * @param period - The time period to fetch trending videos for, in days (default is 7).
 * @param page - The page number to fetch (default is 1).
 * @param limit - The number of videos to fetch per page (default is 10).
 * @param country_code - The country code to filter videos by (default is 'US').
 */
export default async function getTikTokTrendingVideos(params?: Record<string, string | number>) {
  // TikTok's API requires authentication headers that are generated dynamically.
  // A simple way to obtain these headers is to use a headless browser to visit the TikTok Creative Center page
  // and intercept the necessary headers from the network requests.
  const context = await browser.newContext();
  const page = await context.newPage();

  // Intercept requests to capture authentication headers
  // These headers are required to access the private TikTok API.
  let timestamp = 0;
  let webId = '';
  let userSign = '';
  page.on('request', async (request) => {
    try {
      const timestampHeader = request.headers()['timestamp'];
      const webIdHeader = request.headers()['web-id'];
      const userSignHeader = request.headers()['user-sign'];

      if (timestampHeader && webIdHeader && userSignHeader) {
        timestamp = +timestampHeader;
        webId = webIdHeader || '';
        userSign = userSignHeader || '';

        // Close the page once we have the required headers.
        await page.close();
      }
    } catch (err) {}
  });

  // Navigate to the TikTok Creative Center to trigger the request interception.
  try {
    const url = 'https://ads.tiktok.com/business/creativecenter/inspiration/popular/pc/en';
    await page.goto(url);
    await page.waitForEvent('close');
  } catch (err) {}

  if (!timestamp || !webId || !userSign) {
    throw new Error('Failed to retrieve TikTok authentication headers.');
  }

  // Fetch trending videos using the captured headers.
  const res = await axios.get('https://ads.tiktok.com/creative_radar_api/v1/popular_trend/list', {
    params: {
      period: params?.period || 7,
      page: params?.page || 1,
      limit: params?.limit || 10,
      order_by: 'like',
      country_code: params?.country_code || 'US',
    },
    headers: {
      Timestamp: timestamp,
      'Web-Id': webId,
      'User-Sign': userSign,
    },
  });

  const data = await Promise.all(
    res.data?.data?.videos?.map(async (video: any) => {
      const itemData = await axios.get(video.item_url);

      const dom = new JSDOM(itemData.data);
      const document = dom.window.document;

      // The video details are stored in a JSON object within a script tag.
      const jsonElement = document.querySelector('#__UNIVERSAL_DATA_FOR_REHYDRATION__');

      // JSON is formatted weirdly... so we need to extract it manually
      const between = (str: string, start: string, end: string) => str.split(start)[1]?.split(end)[0] || null;
      const statsJson = between(jsonElement?.textContent || '', '"stats":', ',"statsV2"');
      const stats = statsJson ? JSON.parse(statsJson) : {};

      return {
        image_url: video.cover,
        duration: video.duration,
        url: video.item_url,
        title: video.title,
        statistics: {
          play_count: stats.playCount || null,
          like_count: stats.diggCount || null,
          comment_count: stats.commentCount || null,
          share_count: stats.shareCount || null,
        },
      };
    }) || [],
  );

  return data;
}
