const puppeteer = require('puppeteer');

// Declare shared vars here so that they can be initialized in beforeEach and accessible from test scopes
let browser;
let page;

beforeEach(async () => {
  // Launch Chromium, create a new tab, and navigate it to localhost:3000 where the app is located
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('localhost:3000');
});

// Exit the current instance of Chromium after each test
afterEach(async () => {
  await browser.close();
});

test('We can launch a new browser instance', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);

  expect(text).toEqual('Blogster');
})
