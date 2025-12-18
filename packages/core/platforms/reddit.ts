import axios from 'axios';

const axiosReddit = axios.create({
  baseURL: 'https://www.reddit.com',
});

export interface RedditParams {
  subreddit?: string;
  t?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
}

/**
 * Fetches trending posts from Reddit's popular page.
 *
 * @param subreddit - The subreddit to fetch trending posts from (default is 'popular').
 * @param t - The time range for trending posts. Can be 'hour', 'day', 'week', 'month', 'year', or 'all'.
 */
export async function getRedditTrendingPosts(params?: RedditParams) {
  // Reddit allows appending .json to almost any URL to get the JSON representation.
  const res = await axiosReddit.get(`/r/${params?.subreddit || 'popular'}/top.json`, { params });

  const posts = res.data.data.children.map((child: any) => {
    const post = child.data;
    return {
      id: post.id,
      title: post.title,
      url: `${axiosReddit.defaults.baseURL}${post.permalink}`,
      subreddit: post.subreddit,
      upvotes: post.ups,
      comments_count: post.num_comments,
      image_url: post.thumbnail && post.thumbnail.startsWith('http') ? post.thumbnail : null,
      video_url: post.is_video ? post.media?.reddit_video?.fallback_url : null,
    };
  });

  return posts;
}

export const reddit = {
  posts: getRedditTrendingPosts,
};
