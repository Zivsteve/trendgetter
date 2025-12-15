import playwright from 'playwright';

// Initialize and export a single browser instance.
export let browser: playwright.Browser;
export async function initBrowser() {
  browser = await playwright.webkit.launch({ headless: true });
}
