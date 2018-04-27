const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

class TestingPage {
  constructor(page) {
    this.page = page;
  }

  // Declare as a static method, so we can call const ... = await TestingPage.build() without needing to make a new instance first
  static async build() {
    // Generate the browser and page from puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Construct the TestingPage instance with an internal reference to the puppeteer page implementation
    const testingPage = new TestingPage(page);

    // Return a Proxy which prioritizes our custom methods first, and falls back to the others if undefined
    return new Proxy(testingPage, {
      get: function(target, property) {
        // Get really crazy, and use the proxy to give us access to methods on all three objects
        // We only ever use browser for launching a new page, so we don't really need a separate browser instance
        return target[property] || browser[property] || page[property];
      },
    });
  }

  // Mock the process of logging in by generating a dummy test user, generating a cookie + cookie sig and assigning them
  // to the page, then refreshing and waiting for the logout button to render
  async login() {
    const user = await userFactory();
    const { session, sig } = sessionFactory(user);

    // Set cookies and reload page to fake logging in
    await this.page.setCookie({ name: 'session', value: session });
    await this.page.setCookie({ name: 'session.sig', value: sig });
    await this.page.reload();
    // We should wait for the app to finish rendering the logout button before testing for it. Otherwise code executes too fast
    await this.page.waitFor('a[href="/auth/logout"]');
  }
};

module.exports = TestingPage;
