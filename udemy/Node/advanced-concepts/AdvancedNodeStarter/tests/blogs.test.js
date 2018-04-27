const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('When logged in, can see the blog creation form', async () => {
  await page.login();
  await page.click('a.btn-floating.btn-large.red');

  const label = await page.getContentsOf('form label');

  expect(label).toEqual('Blog Title');
});

// test('Clicking login initiates OAuth flow', async () => {
//   await page.click('.right a');

//   const url = await page.url();

//   expect(url).toMatch(/accounts\.google\.com/);
// });

// test('When signed in, logout button is displayed', async () => {
//   // Mock the process of logging in before rest of test
//   await page.login();
//   const logoutText = await page.getContentsOf('a[href="/auth/logout"]');

//   expect(logoutText).toEqual('Logout');
// });
