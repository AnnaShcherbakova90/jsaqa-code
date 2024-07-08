const puppeteer = require("puppeteer");
//const chai = import("chai");
const { expect } = require('chai');
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const {
  putText,
  getText,
  clickElement,
  waitForPageLoaded,
} = require("../../lib/commands.js");

setDefaultTimeout(60000);
Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru${string}`, {
    setTimeout: 20000,
  });
});

When("user choose the day", async function () {
  return await clickElement(this.page, "a[data-time-stamp='1720731600']");
});

When("user choose the seance", async function () {
  return await clickElement(this.page, "a[data-seance-id='218']");
});

Then("user redirected to the next page", async function () {
  return waitForPageLoaded;
});
When("user search by {string}", async function (string) {
  return await putText(this.page, "", string);
});

Then("user sees chosen seanse {string}", async function (string) {
  const actual = await getText(this.page, "h2.buying__info-title");
  const expected = await string;
  expect(actual).to.contain(expected);
});

When("user selects the seat", async function () {
return await clickElement(
  this.page,
  "span[class='buying-scheme__chair buying-scheme__chair_standart']"
);
});

When("user click on accept button", async function () {
  return await clickElement(this.page, "button.acceptin-button");
});

Then("user sees booked seanse {string}", async function (string) {
  const actual = await getText(this.page, "span.ticket__details.ticket__title");
  const expected = await string;
  expect(actual).to.contain(expected);
});

When("user selects the booked seat", async function () {
  return await clickElement(this.page, "span[class='buying-scheme__chair buying-scheme__chair_taken']");
});

Then("user can not click on accept button", async function () {
  const bookButton = await this.page.$("button[class='acceptin-button']");
  const isDisabled = await bookButton.evaluate((btn) => btn.disabled);
  expect(isDisabled).to.be.true;
});
