
  
  describe('User Main', () => {
    it('find Register User', () => {
        cy.visit('/user')
  
      cy.contains('Register User').click()

      cy.url().should('include', '/registerUser')


      cy.get(':nth-child(1) > input')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')

      cy.get('.add-form > :nth-child(2) > input')
      .type('Admin.12345')
      .should('have.value', 'Admin.12345')

      cy.get('.add-form > :nth-child(3) > input')
      .type('Admin')
      
      cy.get('h3')
      .contains('Password do not match')

      cy.get('.add-form > :nth-child(3) > input')
      .type('.12345')
      
      

       


     


      cy.get('#Terms')
      .check()

      

    })
  })