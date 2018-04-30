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
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
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
    // await this.page.reload();
    // Instead of reload, navigate user to /blogs, as that is the default redirect after completing OAuth flow
    await this.page.goto('http://localhost:3000/blogs');

    // We should wait for the app to finish rendering the logout button before testing for it. Otherwise code executes too fast
    await this.page.waitFor('a[href="/auth/logout"]');
  }

  // Custom wrapper for common use of $eval to get innerHTML of the matching element
  async getContentsOf(selector) {
    return this.page.$eval(selector, (el) => el.innerHTML);
  }

  // Helper GET method to reduce common GET request boilerplate in page tests
  get(path) {
    // If we just ran this as is, evaluate converts the contents to a string, and 'path' would be undefined!
    // We have to pass arguments and then make the inner fn a function of the passed arguments
    return this.page.evaluate(
      (_path) => fetch(_path, {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json()),
      path,
    );
  }

  // Helper POST method to reduce common POST request boilerplate in page tests
  // page.evaluate takes in fn, ...args, so we can just pass as many supplemental args as needed and they'll be rest'ed
  // into the passed fn block in order
  post(path, data) {
    return this.page.evaluate(
      (_path, _data) => fetch(_path, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(_data),
      }).then(res => res.json()),
      path,
      data,
    );
  }

  // Helper method that converts an array of ajax/fetch actions to an array of promises, and returns a Promise of all
  // to be awaited by the caller
  execRequests(actions) {
    return Promise.all(
      // Use this[method] to programmatically perform this.get/this.post based on the action's method property
      actions.map(({ method, path, data }) => this[method](path, data))
    );
  }
};

module.exports = TestingPage;
