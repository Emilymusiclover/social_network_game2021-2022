describe('Pendent Introduction Request', () => {
    it('accept an introduction request', () => {

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
        cy.get('[href="/introduction/pendent"]').click()

        cy.get(':nth-child(2) > [viewBox="0 0 512 512"]').click()

        cy.get('[href="/logout"]').click()

        cy.visit('/login')
        cy.contains('Login').click()

        cy.get(':nth-child(1) > input')
        .type('user2@email.com')
        .should('have.value', 'user2@email.com')

        cy.get('.add-form > :nth-child(2) > input')
        .type('User2!54321')
        .should('have.value', 'User2!54321')

        cy.get('.add-form > .btn').click()

        cy.get('.main-nav > [href="/connections"]').click()
        cy.get('[href="/connections/pendent"]').click()

    })
})
