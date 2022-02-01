describe('Pendent Connection Request', () => {
    it('rejects a connection request', () => {

        cy.visit('/login')
        cy.contains('Login').click()

        cy.get(':nth-child(1) > input')
        .type('admin@email.com')
        .should('have.value', 'admin@email.com')

        cy.get('.add-form > :nth-child(2) > input')
        .type('Admin!54321')
        .should('have.value', 'Admin!54321')

        cy.get('.add-form > .btn').click()

        cy.get('.main-nav > [href="/connections"]').click()
        cy.get('[href="/connections/pendent"]').click()

        cy.get(':nth-child(2) > [viewBox="0 0 352 512"]').click()

    })
})