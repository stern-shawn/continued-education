const puppeteer = require('puppeteer');

test('We can launch a new browser instance', async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
})
