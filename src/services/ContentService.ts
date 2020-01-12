import { API_URL } from '../Config';

/** */
const getGoogleSearches = async () => get('google');
/** */
const getYoutubeVideos = async () => get('youtube');
/** */
const getTwitterTags = async () => get('twitter');
/** */
const getRedditPosts = async () => get('reddit');
/** */
const getGithubRepositories = async () => get('github');
/** */
const getSnapchatStories = async () => get('snapchat');
/**
 * 
 * @param username 
 */
const getSnapchatStory = async (username: string) => get(`snapchat/${username}`);

/**
 *
 * @param path
 */
async function get(path = '') {
  try {
    const res = await fetch(`${API_URL}/${path}`, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
    return await res.json();
  } catch (e) {
    return [];
  }
}

export default {
  getGoogleSearches,
  getYoutubeVideos,
  getTwitterTags,
  getRedditPosts,
  getGithubRepositories,
  getSnapchatStories,
  getSnapchatStory,
};
