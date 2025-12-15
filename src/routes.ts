export const ENDPOINTS = {
  'github/repos': require('./platforms/github'),
  'google/topics': import('./platforms/google'),
  'tiktok/videos': import('./platforms/tiktok'),
  'youtube/videos': import('./platforms/youtube'),
  'x/tags': import('./platforms/x'),
  'reddit/posts': import('./platforms/reddit'),
};
