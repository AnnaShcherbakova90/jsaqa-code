describe("Создание, правка, удаление пользователя", () => {
  const user = {
    id: 1234,
    username: "anna_sh",
    firstName: "Anna",
    lastName: "Shcherb",
    email: "shcherb.doe@example.com",
    password: "password123",
    phone: "1234567890",
    userStatus: 1,
  };

  const expectedResponse = {
    code: 200,
    type: "unknown",
    message: "1234",
  };

  it("Создание пользователя", () => {
    cy.request("POST", "/user", user).then((response) => {
      expect(response.status).be.eql(200);
      expect(response.body).to.deep.equal(expectedResponse);
    });
  });

  it("Правка пользователя", () => {
    const updatedUser = {
      id: user.id,
      username: "anna_sh",
      firstName: "Updated Anna",
      lastName: "Updated Shcherb",
      email: "updated.anna.doe@example.com",
      password: "password123",
      phone: "0987654321",
      userStatus: 2,
    };

    cy.request("PUT", `/user/${user.username}`, updatedUser).then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(expectedResponse);
      }
    );

    cy.request({
      method: "GET",
      url: `/user/${user.username}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(updatedUser);
    });
  });

  it("Удаление пользователя", () => {
    cy.request({ method: "DELETE", url: `/user/${user.username}` }).then(
      (response) => {
        expect(response.status).to.equal(200);
      }
    );

    cy.request({
      method: "GET",
      url: `/user/${user.username}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
});
