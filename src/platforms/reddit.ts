import axios from 'axios';

/**
 * Fetches trending posts from Reddit's popular page.
 *
 * @param subreddit - The subreddit to fetch trending posts from (default is 'popular').
 * @param t - The time range for trending posts. Can be 'hour', 'day', 'week', 'month', 'year', or 'all'.
 */
export default async function getRedditTrendingPosts(params?: Record<string, string | number>) {
  // Reddit allows appending .json to almost any URL to get the JSON representation.
  const res = await axios.get(`https://www.reddit.com/r/${params?.subreddit || 'popular'}/top.json`, { params });

  const posts = res.data.data.children.map((child: any) => {
    const post = child.data;
    return {
      id: post.id,
      title: post.title,
      url: `https://www.reddit.com${post.permalink}`,
      subreddit: post.subreddit,
      upvotes: post.ups,
      comments_count: post.num_comments,
      image_url: post.thumbnail && post.thumbnail.startsWith('http') ? post.thumbnail : null,
      video_url: post.is_video ? post.media?.reddit_video?.fallback_url : null,
    };
  });

  return posts;
}
