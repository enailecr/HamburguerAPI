let fakeHamburguer;
let returnedHamburguer;

describe('Given the Hamburguers api', () => {
  before(() => {
    cy.task('freshHamburguer').then((ingredient) => {
      fakeHamburguer = ingredient;
      cy.log(JSON.stringify(fakeHamburguer))
    });
  });

  context('GET /hamburguers', () => {
    it('should return a list with all ingredients', () => {
        cy.request({
            method: 'GET',
            url: '/hamburguers'
        })
            .should((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(200);
                assert.isArray(response.body, 'Todos Response is an array')
            });
    });
});

  context('When I send POST /hamburguers', () => { 
    it('Then it should create a new ingredient', () => {
      cy.request({
        method: 'POST',
        url: '/hamburguers',
        body: fakeHamburguer
      })
        .should((response) => {
          expect(response.status).eq(200)
          expect(response.body.nome).eq(fakeHamburguer.nome)
          returnedHamburguer = response.body;
        });
    });
  });
  context('When I send GET /hamburguers passing id query param', () => {
    it('Then it should return only the filtered hamburguer', () => {
      cy.request({
        method: 'GET',
        url: `/hamburguer/${returnedHamburguer._id}`,
      })
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.nome).to.eq(returnedHamburguer.nome)
        });
    });
  });

  context('When I send DELETE /hamburguers passing id query param', () => {
    it('Then it should return hamburguer deleted', () => {
        console.log(returnedHamburguer)
      cy.request({
        method: 'DELETE',
        url: `/hamburguers/${returnedHamburguer._id}`,
      })
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.nome).to.eq(returnedHamburguer.nome)
        });
    });

    it('Then it should not return hamburguer deleted', () => {
        cy.request({
          method: 'DELETE',
          url: '/hamburguers/61da182616667e7d4c7b2166',
          failOnStatusCode: false,
        })
          .should((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).to.eq('Hamburguer não encontrado')
          });
      });
  });
});