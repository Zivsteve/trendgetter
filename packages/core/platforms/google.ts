import axios from 'axios';
import { JSDOM } from 'jsdom';

/** Enum for Google topic categories. */
export enum GoogleCategory {
  ALL = undefined,
  AUTOS_AND_VEHICLES = 1,
  BEAUTY_AND_FASHION = 2,
  BUSINESS_AND_FINANCE = 3,
  ENTERTAINMENT = 4,
  FOOD_AND_DRINK = 5,
  GAMES = 6,
  HEALTH = 7,
  HOBBIES_AND_LEISURE = 8,
  JOBS_AND_EDUCATION = 9,
  LAW_AND_GOVERNMENT = 10,
  OTHER = 11,
  PETS_AND_ANIMALS = 12,
  POLITICS = 13,
  SCIENCE = 14,
  SHOPPING = 15,
  SPORTS = 16,
  TECHNOLOGY = 17,
  TRAVEL_AND_TRANSPORTATION = 18,
  CLIMATE = 19,
}

export interface GoogleParams {
  geo?: string;
  hl?: string;
  hours?: number;
  status?: string;
  sort?: string;
  category?: GoogleCategory;
}

const DEFAULT_PARAMS: GoogleParams = {
  geo: 'US',
  hl: 'en-US',
  hours: 24,
  status: 'active',
  sort: 'relevance',
  category: GoogleCategory.ALL,
};

/**
 * Fetches trending topics from Google Trends RSS feed.
 *
 * @param geo - The geographical location to filter trends by (e.g., 'US' for United States).
 * @param hl - The language for the trends (e.g., 'en-US' for English - United States).
 * @param hours - The time range for trending topics in hours (e.g., 1, 4, 24).
 * @param status - Whether to include only active trends ('active').
 * @param sort - The sorting method for trends ('title', 'sort-volume', 'recency', 'relevance (default)').
 * @param category  - The category to filter trending topics by (default is GoogleCategory.ALL).
 *
 * {@link GoogleCategory} - Enum for Google topic categories. Example: GoogleCategory.SPORTS
 *
 * @example
 * ```typescript
 * await google.topics({
 *   geo: 'US',
 *   hl: 'en-US',
 *   hours: 24,
 *   category: GoogleCategory.SPORTS,
 * })
 * ```
 */
export async function getGoogleTrendingTopics(params?: GoogleParams) {
  // Google Trends provides a public RSS feed for trending topics.
  const res = await axios.get('https://trends.google.com/trending/rss', {
    params: {
      geo: params?.geo || DEFAULT_PARAMS.geo,
      hl: params?.hl || DEFAULT_PARAMS.hl,
      hours: params?.hours || DEFAULT_PARAMS.hours,
      status: params?.status || DEFAULT_PARAMS.status,
      sort: params?.sort || DEFAULT_PARAMS.sort,
      cat: params?.category || DEFAULT_PARAMS.category,
    },
  });

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
