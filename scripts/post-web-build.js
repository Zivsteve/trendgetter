const replace = require('replace-in-file');

const manifestPath = 'web-build/manifest.json';

/* Modify Expo's manifest.json. */

// [PWA] Add maskable property to icons.
replace({
  from: new RegExp('"type": "image/png"', 'g'),
  to: `"type": "image/png",
      "purpose": "any maskable"`,
  files: manifestPath,
}).then(() => {
  // Link related_applications.
  replace({
    from: '"related_applications": []',
    to: `"related_applications": [
    {
      "platform": "play",
      "url": "https://play.google.com/store/apps/details?id=com.trendgetter",
      "id": "com.trendgetter"
    }
  ]`,
    files: manifestPath,
  });
});

console.log('\x1b[32m', '[DONE] Web built successfully!', '\x1b[0m');
