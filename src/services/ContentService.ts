import { API_URL } from '../Config';

const getGoogleSearches = async () => get('google');
const getYoutubeVideos = async () => get('youtube');
const getTwitterTags = async () => get('twitter');
const getRedditPosts = async () => get('reddit');
const getGithubRepositories = async () => get('github');
const getSnapchatStories = async () => get('snapchat');
const getSnapchatStory = async (username: string) => get(`snapchat/${username}`);

async function get(path = '') {
  try {
    const res = await fetch(`${API_URL}/${path}`);
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
