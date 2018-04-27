Instead of manipulating a library's prototype with our own custom functionality or trying to extend the class with a custom class, we can use the ES6 Proxy object.

Tying it below with this sample greeting code where we pretend the `Greetings` class is from an external library that we want to extend the functionality of, but that we do not want to directly modify either:

```JavaScript
class Greetings {
  english() { return 'Hello'; }
  spanish() { return 'Hola'; }
}

class MoreGreetings {
  german() { return 'Hallo'; }
  japanese() { return 'Konnichiha'; }
}

const greetings = new Greetings();
const moreGreetings = new MoreGreetings();

const allGreetings = new Proxy(moreGreetings, {
  // Here, `target` is moreGreetings
  get: function(target, property) {
    return target[property] || greetings[property];
  },
});

console.log(allGreetings.japanese());
console.log(allGreetings.english());
```

Here we can see that when we try to access a property on the proxy, it attempts to get the property first from the target (`moreGreetings`), and falls back to the original `greetings` implementation if it returns `undefined`, ie. the method isn't implemented in our custom version.

In the context of our testing, this means we can extend the puppeteer Page object in this manner to include our custom login + set cookie logic as below:

```JavaScript
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
```

This page can then be imported in our test suite, declared reusably in our beforeEach as `page = await Page.build();` (earlier in upper scope declare `let page` of course), and then we simply call `await page.login();` at the start of any test that requires an authenticated user session.
