import axios from 'axios';

const axiosPinterest = axios.create({
  baseURL: 'https://trends.pinterest.com',
});

/** Enum for Pinterest pin categories. */
export enum PinsCategory {
  ALL = undefined,
  ANIMALS = '925056443165',
  ARCHITECTURE = '918105274631',
  ART = '961238559656',
  BEAUTY = '935541271955',
  DESIGN = '902065567321',
  DIY_AND_CRAFTS = '934876475639',
  EDUCATION = '922134410098',
  ELECTRONICS = '960887632144',
  ENTERTAINMENT = '953061268473',
  EVENT_PLANNING = '941870572865',
  FASHION = '948967005229',
  FINANCE = '913207199297',
  FOOD_AND_DRINK = '918530398158',
  HEALTH = '898620064290',
  HOME_DECOR = '935249274030',
  LAWN_AND_GARDEN = '909983286710',
  PARENTING = '920236059316',
  QUOTES = '948192800438',
  SPORTS = '919812032692',
  TRAVEL = '908182459161',
  VEHICLES = '918093243960',
  WEDDINGS = '903260720461',
}

export interface PinterestParams {
  country_code?: string;
  category?: PinsCategory;
}

/**
 * Fetches trending pins from Pinterest's popular page.
 *
 * @param country_code - The country code to fetch trending pins for (default is 'US').
 * @param category - The category to filter trending pins by (default is PinsCategory.ALL). Multiple categories can be provided as an array.
 *
 * {@link PinsCategory} - Enum for Pinterest pin categories. Example: PinsCategory.FOOD_AND_DRINK
 *
 * @example
 * ```typescript
 * await pinterest.pins({
 *   country_code: 'US',
 *   category: PinsCategory.FOOD_AND_DRINK,
 * })
 * ```
 */
export async function getPinterestTrendingPins(params?: PinterestParams) {
  // Pinterest provides a private API to fetch trending pins.
  const res = await axiosPinterest.get('/resource/ApiResource/get', {
    params: {
      source_url: '/',
      data: JSON.stringify({
        options: {
          url: `/ads/v4/trends/topics/featured/${params?.country_code || 'US'}/SAVE`,
          interests: [params?.category || PinsCategory.ALL].flat().filter(Boolean),
          data: { publish_state: 'PUBLISHED' },
        },
        context: {},
      }),
      _: `${Date.now()}`,
      ...params,
    },
    headers: {
      'X-Pinterest-Pws-Handler': 'trends/index.js', // Important header to mimic Pinterest's internal requests
    },
  });

  return (
    res.data?.resource_response?.data?.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      pins: item.pins,
    })) || []
  );
}

export const pinterest = {
  pins: getPinterestTrendingPins,
};
