import axios from 'axios';

const axiosYT = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
});

export interface YoutubeParams {
  country_code?: string;
  limit?: number;
}

const DEFAULT_PARAMS: YoutubeParams = {
  country_code: 'US',
  limit: 10,
};

/**
 * Fetches trending videos from YouTube using the YouTube Data API.
 *
 * @param country_code - The region code to fetch trending videos for (default is 'US').
 * @param limit - The number of trending videos to fetch (default is 10).
 */
export async function getYoutubeTrendingVideos(params?: YoutubeParams) {
  // YouTube has unfortunately removed their trending page.
  // However, we can use the YouTube Data API to fetch trending videos.
  const res = await axiosYT.get('/videos', {
    params: {
      part: 'snippet,contentDetails,statistics',
      chart: 'mostPopular',
      regionCode: params?.country_code || DEFAULT_PARAMS.country_code,
      maxResults: params?.limit || DEFAULT_PARAMS.limit,
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
