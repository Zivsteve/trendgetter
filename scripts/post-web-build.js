const replace = require('replace');

// [PWA] Add maskable property to icons.
replace({
  regex: '"type": "image/png"',
  replacement: '"type": "image/png",\n      "purpose": "any maskable"',
  paths: ['web-build/manifest.json'],
  recursive: false,
  silent: true,
});

console.log('\x1b[32m', 'Web built successfully!', '\x1b[0m');
