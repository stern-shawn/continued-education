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

test('Header contains correct text', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);

  expect(text).toEqual('Blogster');
});

test('Clicking login initiates OAuth flow', async () => {
  await page.click('.right a');

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, logout button is displayed', async () => {
  const id = '5ae0f41459620cf7e403a9af';
  const sessionObject = {
    passport: {
      user: id,
    },
  };

  const Buffer = require('safe-buffer').Buffer;
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString('base64');

  const Keygrip = require('keygrip');
  const keys = require('../config/keys');
  const keygrip = new Keygrip([keys.cookieKey]);

  const sig = keygrip.sign(`session=${sessionString}`);

  // Set cookies and reload page to fake logging in
  await page.setCookie({ name: 'session', value: sessionString });
  await page.setCookie({ name: 'session.sig', value: sig });
  await page.reload();
});
