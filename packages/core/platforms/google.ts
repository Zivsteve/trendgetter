import axios from 'axios';
import { JSDOM } from 'jsdom';

/**
 * Fetches trending topics from Google Trends RSS feed.
 *
 * @param geo - The geographical location to filter trends by (e.g., 'US' for United States).
 * @param hl - The language for the trends (e.g., 'en-US' for English - United States).
 * @param hours - The time range for trending topics in hours (e.g., 1, 4, 24).
 * @param status - Whether to include only active trends ('active').
 * @param sort - The sorting method for trends ('title', 'sort-volume', 'recency', 'relevance (default)').
 * @param category - The category index to filter trends by:
 *    1. Autos and Vehicles
 *    2. Beauty and Fashion
 *    3. Business and Finance
 *    4. Entertainment
 *    5. Food and Drink
 *    6. Games
 *    7. Health
 *    8. Hobbies and Leisure
 *    9. Jobs and Education
 *    10. Law and Government
 *    11. Other
 *    12. Pets and Animals
 *    13. Politics
 *    14. Science
 *    15. Shopping
 *    16. Sports
 *    17. Technology
 *    18. Travel and Transportation
 *    19. Climate
 */
export async function getGoogleTrendingTopics(params?: Record<string, string | number>) {
  // Google Trends provides a public RSS feed for trending topics.
  const res = await axios.get('https://trends.google.com/trending/rss', { params });

  const dom = new JSDOM(res.data, { contentType: 'text/xml' });
  const document = dom.window.document;

  const itemElements = document.querySelectorAll('item');
  const topics = Array.from(itemElements).map((itemElement) => {
    const titleElement = itemElement.querySelector('title');
    const linkElement = itemElement.querySelector('link');
    const pubDateElement = itemElement.querySelector('pubDate');
    const descriptionElement = itemElement.querySelector('description');
    const trafficElement = itemElement.getElementsByTagName('ht:approx_traffic');
    const imageElement = itemElement.getElementsByTagName('ht:picture');
    const imageSourceElement = itemElement.getElementsByTagName('ht:picture_source');

    return {
      title: titleElement ? titleElement.textContent.trim() : null,
      link: linkElement ? linkElement.textContent.trim() : null,
      date: pubDateElement ? new Date(pubDateElement.textContent.trim()) : null,
      description: descriptionElement ? descriptionElement.textContent.trim() : null,
      approximate_traffic: trafficElement ? trafficElement[0].textContent.trim() : null,
      image_url: imageElement ? imageElement[0].textContent.trim() : null,
      image_source: imageSourceElement ? imageSourceElement[0].textContent.trim() : null,
    };
  });

  return topics;
}

export const google = {
  topics: getGoogleTrendingTopics,
};
