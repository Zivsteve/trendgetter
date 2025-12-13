# 🌎 Trendgetter API

![GitHub package.json version](https://img.shields.io/github/package-json/v/Zivsteve/trendgetter-api?style=flat-square)
![GitHub](https://img.shields.io/github/license/Zivsteve/trendgetter-api?style=flat-square)

---

Trendgetter API is a free and open-source API that provides trending data from various platforms such as Google, YouTube, X, Reddit, GitHub, and TikTok.

You can clone this repository and run your own instance of the API.

## 🎉 Trendgetter API 2.0 is here!

The Trendgetter API has been completely rewritten from scratch to provide a more robust and scalable solution for fetching trending data from multiple platforms. The new version includes improved error handling, better performance, and support for additional platforms.

---

### How to Use

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Zivsteve/trendgetter-api.git
   cd trendgetter-api
   yarn
   yarn dev
   ```

2. **Set up environment variables:**
   - Copy the `.env.example` file to `.env` and fill in any required API keys.

3. **Access the API endpoints:**
   - The API will be running at `http://localhost:3000` by default.
   - You can access the available endpoints as described below.

---

### Available Platforms & Explanations:

---

<details>
  <summary>
  Google
  </summary>

`/api/google/topics` - Get trending search topics from Google Trends.

| Parameter | Type   | Default | Description                                       |
| --------- | ------ | ------- | ------------------------------------------------- |
| `hl`      | string | `en`    | Language code (e.g., `en`, `es`, `fr`)            |
| `geo`     | string | `US`    | Geographic location code (e.g., `US`, `GB`, `IN`) |
| `cat`     | string | `0`     | Category code for trends                          |

> Google provides an official RSS feed for trending search terms:
> https://trends.google.com/trending/rss

</details>

---

<details>
  <summary>YouTube</summary>

`/api/youtube/videos` - Get trending videos from YouTube.

| Parameter     | Type   | Default | Description                                                                    |
| ------------- | ------ | ------- | ------------------------------------------------------------------------------ |
| `region_code` | string | `US`    | The region code for which to retrieve trending videos (e.g., `US`, `GB`, `IN`) |
| `limit`       | string | `10`    | The maximum number of trending videos to retrieve.                             |

**YouTube Data API v3**

> Unfortunately, YouTube removed their official trending page in 2025.

> However, you can still retrieve trending videos using the YouTube Data API v3:
> https://developers.google.com/youtube/v3/docs/videos/list

</details>

---

<details>
  <summary>X</summary>

`/api/x/tags` - Get trending hashtags from X (formerly Twitter).

| Parameter  | Type   | Default | Description                                                                                         |
| ---------- | ------ | ------- | --------------------------------------------------------------------------------------------------- |
| `location` | string | `''`    | The location for which to retrieve trending hashtags (e.g., `US`, `GB`). Leave empty for worldwide. |

**Workaround for X's limited API**

> Unfortunately, X made their official API really expensive and limited access.

> The platform also requires authentication for accessing trending topics.

> A workaround is to scrape this third-party site that displays X's trending topics:
> https://trends24.in/

</details>

---

<details>
  <summary>Reddit</summary>

`/api/reddit/posts` - Get trending posts from Reddit.

| Parameter   | Type   | Default   | Description                                                                                 |
| ----------- | ------ | --------- | ------------------------------------------------------------------------------------------- |
| `subreddit` | string | `popular` | The subreddit from which to retrieve trending posts (e.g., `popular`, `all`, `funny`)       |
| `t`         | string | `day`     | The time range for trending posts. Can be 'hour', 'day', 'week', 'month', 'year', or 'all'. |

**Reddit API**

> Reddit has an amazing API. You can add .json to almost any page to get it's posts.

> For example, the top posts of r/popular:
> https://www.reddit.com/r/popular/top.json

</details>

---

<details>
  <summary>GitHub</summary>

`/api/github/repos` - Get trending repositories from GitHub.

| Parameter              | Type   | Default | Description                                                                       |
| ---------------------- | ------ | ------- | --------------------------------------------------------------------------------- |
| `since`                | string | `daily` | The time range for trending repositories. Can be 'daily', 'weekly', or 'monthly'. |
| `language`             | string | `''`    | The programming language to filter repositories by (e.g., 'javascript', 'python') |
| `spoken_language_code` | string | `''`    | The spoken language to filter repositories by. (e.g., 'en' for English)           |

**GitHub Trending Page**

> GitHub doesn't have an official API, but it has a trending page which we can parse:
> https://github.com/trending

> We can also get trending developers:
> https://github.com/trending/developers

</details>

---

<details>
  <summary>TikTok</summary>

`/api/tiktok/videos` - Get trending videos from TikTok.

| Parameter      | Type   | Default | Description                                                                     |
| -------------- | ------ | ------- | ------------------------------------------------------------------------------- |
| `period`       | number | `7`     | The time period (in days) to retrieve trending videos for. Can be 1, 7, or 30.  |
| `page`         | number | `1`     | The page number of results to retrieve.                                         |
| `limit`        | number | `10`    | The maximum number of trending videos to retrieve per page.                     |
| `country_code` | string | `US`    | The country code for which to retrieve trending videos (e.g., `US`, `GB`, `IN`) |

**TikTok's Unofficial API**

> TikTok does not provide an official API for trending videos.

> However, we can use TikTok's internal API endpoints from their Creative Center to fetch trending videos by mimicking the requests made by the TikTok web application.

> https://ads.tiktok.com/business/creativecenter/inspiration/popular/pc/en

</details>

---

### Donate

Help me improve this project! Any amount is much appreciated :)

<a href="https://www.buymeacoffee.com/YkncqEs" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/default-blue.png" alt="Buy Me A Coffee" width="217" height="51">
</a>

---

## License

> Copyright (C) 2020-present Zivsteve.  
> Licensed under the [MIT](https://opensource.org/licenses/MIT) license.  
> (See the [LICENSE](https://github.com/Zivsteve/trendgetter-api/blob/master/LICENSE) file for the whole license text.)

# Contributing

Feel free to open issues or submit pull requests for improvements or new features!
