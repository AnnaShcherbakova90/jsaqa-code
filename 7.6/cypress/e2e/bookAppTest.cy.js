describe("Тест BookApp", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Тест логина", () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible").true;
  });

  it("Тест пустого имени пользователя", () => {
    cy.login("", "123");
    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    });
  });

  it("Тест пустого пароля", () => {
    cy.login("bropet@mail.ru", "");
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    });
  });
});
