import axios from 'axios';

const axiosHN = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
});

export interface HackerNewsParams {
  type?: 'top' | 'new' | 'best';
  limit?: number;
}

/**
 * Fetches trending posts from Hacker News.
 *
 * @param type - The type of trending posts to fetch. Can be 'top', 'new', or 'best'.
 */
export async function getHackerNewsTrendingPosts(params?: HackerNewsParams) {
  // Hacker News provides a public API to fetch top, new, and best stories.
  const TYPES = {
    top: 'topstories',
    new: 'newstories',
    best: 'beststories',
  };
  type Type = keyof typeof TYPES;

  const type = params?.type && TYPES[params.type as Type] ? params.type : 'top';
  const typeKey = TYPES[type as Type];

  const res = await axiosHN.get(`/${typeKey}.json`);
  // The API returns an array of post IDs.
  const postIds: number[] = res.data.slice(0, params?.limit ? +params.limit : 20);

  // Fetch details for each post by its ID.
  const postPromises = postIds.map(async (id) => {
    const postRes = await axiosHN.get(`/item/${id}.json`);
    return postRes.data;
  });
  const posts = await Promise.all(postPromises);

  return posts.map((post) => ({
    id: post.id,
    type: post.type,
    by: post.by,
    time: post.time,
    title: post.title,
    url: post.url ? post.url : `https://news.ycombinator.com/item?id=${post.id}`,
    score: post.score,
  }));
}

export const hackernews = {
  posts: getHackerNewsTrendingPosts,
};
