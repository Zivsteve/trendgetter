# 🌎 Trendgetter

![GitHub package.json version](https://img.shields.io/npm/v/@trendgetter/core.svg)
![GitHub](https://img.shields.io/github/license/zivsteve/trendgetter?style=flat-square)

---

Trendgetter is a free and open-source API that provides trending data from various platforms such as Google, YouTube, X, Reddit, GitHub, and TikTok.

## Installing

Using npm:

```bash
npm install @trendgetter/core
```

Using yarn:

```
yarn add @trendgetter/core
```

## Usage

Import the package:

```typescript
import * as trendgetter from '@trendgetter/core';
```

Fetch trending data using the desired platform:

```typescript
const results = await trendgetter.youtube.videos();
console.log(results);
```

## Available Platforms

```typescript
trendgetter.github.repos();
trendgetter.google.topics();
trendgetter.hackernews.posts();
trendgetter.reddit.posts();
trendgetter.tiktok.videos();
trendgetter.x.tags();
trendgetter.youtube.videos();
```

---

#### Note: Some platforms may require API keys:

```typescript
trendgetter.youtube.apiKey = 'YOUTUBE_API_KEY';
```

If you are using environment variables, they will be picked up automatically.

---

## Using Parameters

Each platform's methods accept an optional `params` object to customize the request:

```typescript
const results = await trendgetter.youtube.videos({ regionCode: 'GB', maxResults: 5 });
console.log(results);
```

> See the [API Documentation](https://github.com/zivsteve/trendgetter)
> for detailed information on available parameters for each platform.

---

### Contributing

Feel free to open issues or submit pull requests for improvements or new features!
