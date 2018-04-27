const puppeteer = require('puppeteer');

class TestingPage {
  constructor(page) {
    this.page = page;
  }

  // Declare as a static method, so we can call const ... = await TestingPage.build() without needing to make a new instance first
  static async build() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const testingPage = new TestingPage(page);

    return new Proxy(testingPage, {
      get: function(target, property) {
        // Get really crazy, and use the proxy to give us access to methods on all three objects
        // We only ever use browser for launching a new page, so we don't really need a separate browser instance
        return target[property] || page[property] || browser[property];
      },
    });
  }
};

module.exports = TestingPage;
