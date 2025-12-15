export const ENDPOINTS = {
  'github/repos': import('./platforms/github.js'),
  'google/topics': import('./platforms/google.js'),
  'tiktok/videos': import('./platforms/tiktok.js'),
  'youtube/videos': import('./platforms/youtube.js'),
  'x/tags': import('./platforms/x.js'),
  'reddit/posts': import('./platforms/reddit.js'),
};
