import axios from 'axios';
import { JSDOM } from 'jsdom';

/**
 * Fetches trending repositories from GitHub Trending page.
 *
 * @param since - The time range for trending repositories. Can be 'daily', 'weekly', or 'monthly'.
 * @param language - The programming language to filter repositories by.
 * @param spoken_language_code - The spoken language to filter repositories by. (e.g., 'en' for English)
 */
export default async function getGithubTrendingRepos(params?: Record<string, string | number>) {
  // GitHub has a public trending page that can be scraped for trending repositories and does not require authentication.
  const res = await axios.get(`https://github.com/trending/${params?.language || ''}`, { params });

  const dom = new JSDOM(res.data);
  const document = dom.window.document;

  const repoElements = document.querySelectorAll('article.Box-row');
  const repos = Array.from(repoElements).map((repoElement) => {
    const titleElement = repoElement.querySelector('h2 a');
    const descriptionElement = repoElement.querySelector('p.col-9');
    const languageElement = repoElement.querySelector('span[itemprop="programmingLanguage"]');
    const starsElement = repoElement.querySelector('a.Link--muted[href$="/stargazers"]');
    const forksElement = repoElement.querySelector('a.Link--muted[href$="/forks"]');
    const starsTodayElement = repoElement.querySelector('span.d-inline-block.float-sm-right');

    return {
      name: titleElement ? titleElement.textContent.trim().replace(/\s+/g, '') : null,
      url: titleElement ? `https://github.com${titleElement.getAttribute('href')}` : null,
      description: descriptionElement ? descriptionElement.textContent.trim() : null,
      language: languageElement ? languageElement.textContent.trim() : null,
      stars: starsElement ? +starsElement.textContent.trim().replace(',', '') : null,
      forks: forksElement ? +forksElement.textContent.trim().replace(',', '') : null,
      stars_today: starsTodayElement ? +starsTodayElement.textContent.trim().split(' ')[0].replace(',', '') : null,
    };
  });

  return repos;
}
