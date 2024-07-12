describe("Тест BookApp", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it.skip("Тест логина", () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible").true;
  });

  it.skip("Тест пустого имени пользователя", () => {
    cy.login("", "123");
    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it.skip("Тест пустого пароля", () => {
    cy.login("bropet@mail.ru", "");
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("Тест добавления книги", () => {
    cy.login("bropet@mail.ru", "123");
    cy.get('.p-0 > .btn').click();
    cy.get('#title').type("Унесенные ветром")
    cy.get('#description').type("роман")
    cy.get('#authors').type("Маргарет Митчелл")
    //cy.get('#favorite').click();
    cy.get('form > .ml-2').click();
    cy.get('[href="book/2127f685-be2f-4722-b514-5ada7b9393e0"] > .h-100 > .card-footer > .btn').click();
    cy.contains("Маргарет Митчелл").should("be.visible").true;
  });

  it("Тест удаления книги", () => {
    cy.login("bropet@mail.ru", "123");
    cy.get('h4').click();
    cy.get('.card-footer > .btn').click();
    cy.contains("Please add some book to favorit on home page!").should("be.visible").true;
  });
});
