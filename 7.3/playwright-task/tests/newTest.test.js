// @ts-check
const { test, expect } = require("@playwright/test");
const {
  correct_email,
  correct_password,
  wrong_email,
  wrong_password,
} = require("../user.js");

test("positive test", async ({ page }) => {
  await page.goto("https://netology.ru");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(correct_email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(correct_password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page).toHaveURL("https://netology.ru/profile/8786183");
  await expect(page.locator("h2")).toHaveClass(
    "src-components-pages-Profile-Programs--title--Kw5NH",
    { timeout: 15_000 }
  );
});

test("negative test", async ({ page }) => {
  await page.goto("https://netology.ru");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(wrong_email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(wrong_password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByTestId("login-error-hint")).toHaveText(
    "Вы ввели неправильно логин или пароль"
  );
});
