describe('suite', () => {
  it('test case-1', function () {
    //code goes here
    cy.intercept('http://example.com/settings').as('getSettings');

    // once a request to get settings responds, 'cy.wait' will resolve
    cy.wait('@getSettings').its('response.code').should('eq', 200);
  });

  it('req', () => {
    cy.request('https://reqres.in/api/users?page=2')
      .its('body.data')
      .each((value) => {
        console.log(JSON.stringify(value));
        expect(value).to.have.all.keys('id', 'email', 'first_name');
      });

    // cy.get('@getProductList').then((response) => {
    //   cy.log(JSON.parse(response.body));

    //   expect(response.status).to.eq(200);
    //   expect(response).to.have.property('headers');
    //   expect(response).to.have.property('duration');
    //   cy.wrap(response.body.ResponseCode).then((code) => {
    //     cy.log(code);
    //   });
    // });
  });

  it('post', () => {
    cy.request('POST', 'https://reqres.in/api/users', {
      name: 'morpheus',
      job: 'leader',
    }).then((resp) => {
      //cy.log(JSON.parse(resp.body));
      expect(resp.body).to.have.all.keys('name', 'job', 'id', 'createdAt');
      expect(resp.body).to.have.property('name', 'morpheus'); // true
      expect(resp.body).to.have.property('job', 'leader'); // true
      expect(resp.status).to.be.eql(201);
      cy.request('GET', `https://reqres.in/api/users/${resp.body.id}`).then(
        (response) => {
          expect(response.status).to.be.eql(200);
          expect(response.body.data).to.have.any.keys(
            'id',
            'email',
            'first_name'
          );
        }
      );
    });
  });

  before(() => {
    cy.fixture('users').as('usersData');
  });

  it('reading json with for loop', () => {
    cy.get('@usersData').then((data) => {
      for (let i = 0; i < data.length; i++) {
        cy.log(`***this is ${i} element *****`);
        cy.log(`${data[i].id}`);
        cy.log(`${data[i].name}`);
        cy.log(`${data[i].username}`);
        cy.log(`${data[i].address.street}`);
        cy.log(`${data[i].address.geo.lat}`);
        cy.log(`${data[i].address.geo.lng}`);
      }
    });
  });

  it.only('reading json with foreach', () => {
    cy.get('@usersData').then((data) => {
      data.forEach((element) => {
        cy.log(`${element.id}`);
        cy.log(`${element.name}`);
        cy.log(`${element.username}`);
        cy.log(`${element.address.street}`);
        cy.log(`${element.address.geo.lat}`);
        cy.log(`${element.address.geo.lng}`);
      });
    });
  });
});
