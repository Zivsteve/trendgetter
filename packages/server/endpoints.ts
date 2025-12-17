import * as trendgetter from 'trendgetter';

export const ENDPOINTS = {
  'github/repos': trendgetter.github.repos,
  'google/topics': trendgetter.google.topics,
  'reddit/posts': trendgetter.reddit.posts,
  'tiktok/videos': trendgetter.tiktok.videos,
  'youtube/videos': trendgetter.youtube.videos,
  'x/tags': trendgetter.x.tags,
} as const;

export type Endpoint = keyof typeof ENDPOINTS;
