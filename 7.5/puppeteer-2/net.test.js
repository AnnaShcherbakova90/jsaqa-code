const {
  clickElement,
  putText,
  getText,
  waitForPageLoaded,
} = require("./lib/commands.js");
// const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(async () => {
  await page.close();
});

describe("Netology.ru tests", () => {
  test("First test: Booking a movie ticket", async () => {
    await clickElement(page, "a[data-time-stamp='1720731600']");
    await clickElement(page, "a[data-seance-id='218']");
    waitForPageLoaded;

    const chosenMovieName = await getText(page, "h2.buying__info-title");
    expect(chosenMovieName).toContain("Микки маус");
  }, 500000);

  test("Second test: Selecting a seat and booking", async () => {
    await clickElement(page, "a[data-time-stamp='1720731600']");
    await clickElement(page, "a[data-seance-id='218']");
    waitForPageLoaded;
    await clickElement(
      page,
      "span[class='buying-scheme__chair buying-scheme__chair_standart']"
    );
    await clickElement(page, "button.acceptin-button");
    waitForPageLoaded;
    const bookedMovieName = await getText(
      page,
      "span.ticket__details.ticket__title"
    );
    expect(bookedMovieName).toContain("Микки маус");
  }, 70000);

  test("Third test: Checking seat availability", async () => {
    await clickElement(page, "a[data-time-stamp='1720731600']");
    await clickElement(page, "a[data-seance-id='218']");
    waitForPageLoaded;

    await clickElement(
      page,
      "span[class='buying-scheme__chair buying-scheme__chair_taken']"
    );

    const bookButton = await page.$("button[class='acceptin-button']");
    const isDisabled = await bookButton.evaluate((btn) => btn.disabled);

    expect(isDisabled).toEqual(true);
  }, 50000);
});
