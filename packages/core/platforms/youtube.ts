import axios from 'axios';

/**
 * Fetches trending videos from YouTube using the YouTube Data API.
 *
 * @param region_code - The region code to fetch trending videos for (default is 'US').
 * @param limit - The number of trending videos to fetch (default is 10).
 */
export async function getYoutubeTrendingVideos(params?: Record<string, string | number>) {
  // YouTube has unfortunately removed their trending page.
  // However, we can use the YouTube Data API to fetch trending videos.
  const res = await axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
    params: {
      part: 'snippet,contentDetails,statistics',
      chart: 'mostPopular',
      regionCode: params?.region_code || 'US',
      maxResults: params?.limit || 10,
      key: youtube.apiKey,
    },
  });

  return res.data?.items
    ?.map((item: any) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      date: item.snippet.publishedAt,
      channel_title: item.snippet.channelTitle,
      statistics: {
        view_count: item.statistics.viewCount,
        like_count: item.statistics.likeCount,
        comment_count: item.statistics.commentCount,
      },
      details: item.contentDetails,
    }))
    ?.sort((a: any, b: any) => +b.statistics.view_count - +a.statistics.view_count);
}

export const youtube = {
  videos: getYoutubeTrendingVideos,
  apiKey: process?.env?.YOUTUBE_API_KEY || '',
};
