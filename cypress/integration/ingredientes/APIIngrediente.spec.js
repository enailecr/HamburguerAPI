let fakeIngrediente;
let returnedIngrediente;

describe('Given the Ingredients api', () => {
  before(() => {
    cy.task('freshIngrediente').then((ingredient) => {
      fakeIngrediente = ingredient;
      cy.log(JSON.stringify(fakeIngrediente))
    });
  });

  context('GET /ingredientes', () => {
    it('should return a list with all ingredients', () => {
        cy.request({
            method: 'GET',
            url: '/ingredientes'
        })
            .should((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(200);
                assert.isArray(response.body, 'Todos Response is an array')
            });
    });
});

  context('When I send POST /ingredientes', () => { 
    it('Then it should create a new ingredient', () => {
      cy.request({
        method: 'POST',
        url: '/ingredientes',
        body: fakeIngrediente
      })
        .should((response) => {
          expect(response.status).eq(200)
          expect(response.body.nome).eq(fakeIngrediente.nome)
          returnedIngrediente = response.body;
        });
    });
  });
  context('When I send GET /ingredientes passing id query param', () => {
    it('Then it should return only the filtered ingrediente', () => {
      cy.request({
        method: 'GET',
        url: `/ingrediente/${returnedIngrediente._id}`,
      })
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.nome).to.eq(returnedIngrediente.nome)
        });
    });
  });

  context('When I send DELETE /ingredientes passing id query param', () => {
    it('Then it should return ingrediente deleted', () => {
        console.log(returnedIngrediente)
      cy.request({
        method: 'DELETE',
        url: `/ingredientes/${returnedIngrediente._id}`,
      })
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.nome).to.eq(returnedIngrediente.nome)
        });
    });

    it('Then it should not return ingrediente deleted', () => {
        cy.request({
          method: 'DELETE',
          url: '/ingredientes/61da182616667e7d4c7b2166',
          failOnStatusCode: false,
        })
          .should((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).to.eq('Ingrediente não encontrado')
          });
      });
  });
});