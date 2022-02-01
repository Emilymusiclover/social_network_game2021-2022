describe('Create Introduction Request', () => {
    it('creates an introduction request', () => {

        cy.visit('/login')
        cy.contains('Login').click()

        cy.get(':nth-child(1) > input')
        .type('admin@email.com')
        .should('have.value', 'admin@email.com')

        cy.get('.add-form > :nth-child(2) > input')
        .type('Admin!54321')
        .should('have.value', 'Admin!54321')

        cy.get('.add-form > .btn').click()

        cy.get('[href="/introduction"]').click()
        cy.get('[href="/introduction/request"]').click()

        cy.get('.css-1hb7zxy-IndicatorsContainer').type('user2{enter}{enter}')

        cy.get('.add-form > :nth-child(2) > input')
         .type('Olá user 2, gostava muito de te adicionar como amigo')
         .should('have.value', 'Olá user 2, gostava muito de te adicionar como amigo')

         cy.get(':nth-child(3) > .css-b62m3t-container > .css-1s2u09g-control > .css-1hb7zxy-IndicatorsContainer').type('user1{enter}{enter}');

        
         cy.get(':nth-child(4) > input')
         .type('Olá, por favor, introduz-me ao user 2')
         .should('have.value', 'Olá, por favor, introduz-me ao user 2')

        cy.get('.btn').click()

    })
})
