import puppetteer from 'puppeteer';

jest.setTimeout(30000);
describe('test', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:8080';
  beforeAll(async () => {
    browser = await puppetteer.launch();
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  test('Открывает корневую страницу', async () => {
    await page.goto(baseUrl);
  });

  test('Проверка появления tooltip', async () => {
    await page.goto(baseUrl);
    const button = await page.$('button');
    button.click();
    await page.waitForSelector('.show');
  });

  test('Проверка скрытия tooltip', async () => {
    await page.goto(baseUrl);
    const button = await page.$('button');
    button.click();
    await page.waitForSelector('.hidden');
  });
});
