// const { clickElement, putText, getText } = require("./lib/commands.js");
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
  test("The first test", async () => {
    const dayLink = await page.$("a[data-time-stamp='1720386000']");
    await dayLink.click();
    const seanceLink = await page.$("a[data-seance-id='218']");
    await seanceLink.click();

    await page.waitForNavigation();

    const chosenMovieNameElement = await page.$("h2.buying__info-title");
    const chosenMovieName = await page.evaluate(
      (chosenMovieNameElement) => chosenMovieNameElement.textContent,
      chosenMovieNameElement
    );
    expect(chosenMovieName).toContain("Микки маус");
  }, 50000);

  test("The second test", async () => {
    const dayLink = await page.$("a[data-time-stamp='1720386000']");
    await dayLink.click();
    const seanceLink = await page.$("a[data-seance-id='218']");
    await seanceLink.click();

    await page.waitForNavigation();

    console.log("page " + page.url());
    const seatElement = await page.$(
      "span[class='buying-scheme__chair buying-scheme__chair_standart']"
    );

    await seatElement.evaluate((seatElement) => seatElement.click());
    const bookButton = await page.waitForSelector("button.acceptin-button");
    await bookButton.click();

    await page.waitForNavigation();

    const bookedMovieNameElement = await page.$(
      "span[class='ticket__details ticket__title']"
    );
    const bookedMovieName = await page.evaluate(
      (bookedMovieNameElement) => bookedMovieNameElement.textContent,
      bookedMovieNameElement
    );
    expect(bookedMovieName).toContain("Микки маус");
  }, 70000);

  test("The third test", async () => {
    const dayLink = await page.$("a[data-time-stamp='1720386000']");
    await dayLink.click();
    const seanceLink = await page.$("a[data-seance-id='218']");
    await seanceLink.click();

    await page.waitForNavigation();

    console.log("page " + page.url());
    const seatElement = await page.$(
      "span[class='buying-scheme__chair buying-scheme__chair_taken']"
    );

    await seatElement.evaluate((seatElement) => seatElement.click());

    const bookButton = await page.$("button[class='acceptin-button']");

    const isDisabled = await bookButton.evaluate(
      (bookButton) => bookButton.disabled
    );

    expect(isDisabled).toEqual(true);
  }, 50000);
});

//   test("The first link text 'Медиа Нетологии'", async () => {
//     const actual = await getText(page, "header a + a");
//     expect(actual).toContain("Медиа Нетологии");
//   });

//   test("The first link leads on 'Медиа' page", async () => {
//     await clickElement(page, "header a + a");
//     const actual = await getText(page, ".logo__media");
//     await expect(actual).toContain("Медиа");
//   });
// });

// test("Should look for a course", async () => {
//   await page.goto("https://netology.ru/navigation");
//   await putText(page, "input", "тестировщик");
//   const actual = await page.$eval("a[data-name]", (link) => link.textContent);
//   const expected = "Тестировщик ПО";
//   expect(actual).toContain(expected);
// });

// test("Should show warning if login is not email", async () => {
//   await page.goto("https://netology.ru/?modal=sign_in");
//   await putText(page, 'input[type="email"]', generateName(5));
// });
