describe("template spec", () => {
  it("Добавление, проверка, удаление питомца", () => {
    const pet_id = 12345;
    cy.request("POST", "/pet", {
      id: pet_id,
      name: "Jeckson",
      photoUrls: [],
      tags: []
    }).then((Response) => {
      expect(Response.status).be.eql(200);
      expect(Response.body).be.eql({
        id: pet_id,
        name: "Jeckson",
        photoUrls: [],
        tags: []
      });
      cy.request("GET", `/pet/${pet_id}`).then((Response) => {
        expect(Response.status).be.eql(200);
        expect(Response.body).be.eql({
          id: pet_id,
          name: "Jeckson",
          photoUrls: [],
          tags: [],
        });
        cy.request("DELETE", `/pet/${pet_id}`).then((Response) => {
          expect(Response.status).be.eql(200);
          cy.request({
            method: "GET",
            url: `/pet/${pet_id}`,
            failOnStatusCode: false,
          }).then((Response) => {
            expect(Response.status).be.eql(404);
          });
        });
      });
    });
  });
});
