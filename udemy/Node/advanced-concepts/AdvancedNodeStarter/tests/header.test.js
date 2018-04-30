const Page = require('./helpers/page');

// Declare shared vars here so that they can be initialized in beforeEach and accessible from test scopes
let page;

beforeEach(async () => {
  // Launch Chromium, create a new tab, and navigate it to localhost:3000 where the app is located
  // (This is now all encapsulated in our neato TestingPage class as Page, with the static build method)
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

// Exit the current instance of Chromium after each test
afterEach(async () => {
  await page.close();
});

test('Header contains correct text', async () => {
  const text = await page.getContentsOf('a.brand-logo');

  expect(text).toEqual('Blogster');
});

test('Clicking login initiates OAuth flow', async () => {
  await page.click('.right a');

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, logout button is displayed', async () => {
  // Mock the process of logging in before rest of test
  await page.login();
  const logoutText = await page.getContentsOf('a[href="/auth/logout"]');

  expect(logoutText).toEqual('Logout');
});
