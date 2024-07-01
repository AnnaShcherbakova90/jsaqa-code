const jestConfig = require("./jest.config");

let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests1", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 70000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 50000);

  test("The page contains Get started with Team", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 40000);
});

describe("Github page tests2", () => {
  
  test("The h1 header content", async () => {
    await page.goto("https://github.com/marketplace");
    const actual = await page.$eval(
      "h1[class='lh-condensed text-wrap-balance']",
      (text) => text.textContent);
    expect(actual).toEqual("Enhance your workflow with extensions");
  }, 60000);

  test("The page title content", async () => {
    await page.goto("https://github.com/events");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub Events · GitHub");
  }, 40000);


  test("The h1 header content'", async () => {
    await page.goto("https://github.blog");
    const title = await page.title();
    expect(title).toEqual(
      'The GitHub Blog - Updates, ideas, and inspiration from GitHub to help developers build and design software.');
  }, 50000);
});
