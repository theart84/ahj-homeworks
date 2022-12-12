import puppetteer from 'puppeteer';

jest.setTimeout(30000); // default puppeteer timeout
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

  test('Проверка валидного номера карты', async () => {
    await page.goto(baseUrl);
    const form = await page.$('#formValidation');
    const input = await form.$('#cardNumber');
    await input.type('371449635398431');
    const submitButton = await form.$('button');
    submitButton.click();
    await page.waitForSelector('.active');
  });

  test('Проверка невалидного номера карты', async () => {
    await page.goto(baseUrl);
    const form = await page.$('#formValidation');
    const input = await form.$('#cardNumber');
    await input.type('371449635398432');
    const submitButton = await form.$('button');
    submitButton.click();
    await page.waitForSelector('.active');
  });
});
