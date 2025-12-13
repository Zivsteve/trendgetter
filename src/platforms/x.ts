import axios from 'axios';
import { JSDOM } from 'jsdom';

/**
 * Fetches trending tags from X (formerly Twitter) Trends page.
 *
 * @param location - The location to fetch trending tags for (default is 'worldwide').
 */
export default async function getXTrendingTags(params?: Record<string, string | number>) {
  const location = `${params?.location || ''}`.replace(/\s+/g, '-').toLowerCase();

  // X has unfortunately made their API very expensive.
  // As a workaround, we will scrape the trends from the public trends page.
  const res = await axios.get(`https://trends24.in/${location}`);

  const dom = new JSDOM(res.data);
  const document = dom.window.document;

  const tagElements = document.querySelectorAll('.trend-name');
  const tags = Array.from(tagElements).map((tagElement) => {
    const name = tagElement.querySelector('a') ? tagElement.querySelector('a')!.textContent!.trim() : null;
    const url = tagElement.querySelector('a') ? tagElement.querySelector('a')!.getAttribute('href') : null;
    const statCardLink = document.querySelector(`.stat-card-item a[href="${url}"]`);
    return {
      name: name,
      url: url,
      count: tagElement.querySelector('[data-count]')
        ? +tagElement.querySelector('[data-count]')!.getAttribute('data-count')
        : null,
      length: statCardLink ? statCardLink.nextSibling?.textContent?.trim() : null,
    };
  });

  const combinedTags: Record<string, any> = {};
  tags.forEach((tag) => {
    if (tag.name) {
      if (!combinedTags[tag.name]) {
        combinedTags[tag.name] = { ...tag };
      } else {
        combinedTags[tag.name].count += tag.count || 0;
      }
    }
  });

  const uniqueTags = Object.values(combinedTags);

  uniqueTags.sort((a: any, b: any) => (b.count || 0) - (a.count || 0));

  return uniqueTags;
}
