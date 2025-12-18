import axios from 'axios';
import playwright from 'playwright';
import { JSDOM } from 'jsdom';

const axiosTT = axios.create({
  baseURL: 'https://ads.tiktok.com',
});

export interface TikTokParams {
  period?: number;
  page?: number;
  limit?: number;
  country_code?: string;
}

const DEFAULT_PARAMS: TikTokParams = {
  period: 7,
  page: 1,
  limit: 10,
  country_code: 'US',
};

/**
 * Fetches trending videos from TikTok Creative Center.
 *
 * @param period - The time period to fetch trending videos for, in days (default is 7).
 * @param page - The page number to fetch (default is 1).
 * @param limit - The number of videos to fetch per page (default is 10).
 * @param country_code - The country code to filter videos by (default is 'US').
 */
export async function getTikTokTrendingVideos(params?: TikTokParams) {
  // TikTok's API requires authentication headers that are generated dynamically.
  // A simple way to obtain these headers is to use a headless browser to visit the TikTok Creative Center page
  // and intercept the necessary headers from the network requests.
  const browser = await playwright.webkit.launch({
    headless: true,
  });
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
    const url = `${axiosTT.defaults.baseURL}/business/creativecenter/inspiration/popular/pc/en`;
    await page.goto(url);
    await page.waitForEvent('close');
  } catch (err) {}

  if (!timestamp || !webId || !userSign) {
    throw new Error('Failed to retrieve TikTok authentication headers.');
  }

  // Fetch trending videos using the captured headers.
  const res = await axiosTT.get('/creative_radar_api/v1/popular_trend/list', {
    params: {
      period: params?.period || DEFAULT_PARAMS.period,
      page: params?.page || DEFAULT_PARAMS.page,
      limit: params?.limit || DEFAULT_PARAMS.limit,
      country_code: params?.country_code || DEFAULT_PARAMS.country_code,
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

export const tiktok = {
  videos: getTikTokTrendingVideos,
};
