const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');

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
  const user = await userFactory();
  const { session, sig } = sessionFactory(user);

  // Set cookies and reload page to fake logging in
  await page.setCookie({ name: 'session', value: session });
  await page.setCookie({ name: 'session.sig', value: sig });
  await page.reload();
  // We should wait for the app to finish rendering the logout button before testing for it. Otherwise code executes too fast
  await page.waitFor('a[href="/auth/logout"]');

  const logoutText = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

  expect(logoutText).toEqual('Logout');
});
