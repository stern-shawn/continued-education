const puppeteer = require('puppeteer');

test('We can launch a new browser instance', async () => {
  // Launch Chromium, create a new tab, and navigate it to localhost:3000 where the app is located
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('localhost:3000');

  const text = await page.$eval('a.brand-logo', el => el.innerHTML);

  expect(text).toEqual('Blogster');
})
