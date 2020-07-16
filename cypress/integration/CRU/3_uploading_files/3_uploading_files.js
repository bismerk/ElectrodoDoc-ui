import { Then } from 'cypress-cucumber-preprocessor/steps';
import {getLogin, getPassword} from "../../../support/commands";
import {getCSR} from "../../../../src/utils/functions";

before(() => {
    Cypress.env('login', `USER1${getLogin()}`)
    Cypress.env('password', getPassword(8, true))
    Cypress.env('email', `USER1${getLogin()}@gmail.com`)

    let csr = getCSR({username: Cypress.env('login')})
    cy.writeFile('cypress/fixtures/privateKey.pem', csr.privateKeyPem)
    cy.readFile('cypress/fixtures/privateKey.pem').then((key) => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('backendURL')}/user`,
            headers: {'content-type': 'application/json'},
            body: {
                'login': Cypress.env('login'),
                'email': Cypress.env('email'),
                'password': Cypress.env('password'),
                'privateKey': key,
                'CSR': csr.csrPem
            },
        }).then((resp) => {
            if (expect(201).to.eq(resp.status)) {
                Cypress.env('respStatus', resp.status)
                cy.writeFile('cypress/fixtures/cert.pem', resp.body.cert).then(() => {
                })
            }
        })
    }).as('Register new user')
})

Then(/^The user gets error notification "([^"]*)"$/, (errMessage) => {
    cy.get('.ant-message-custom-content')
        .should('be.visible')
        .should('contain.text', errMessage)
});

Then(/^The file "([^"]*)" is not uploaded$/, (file) => {
    cy.contains(file).should('be.visible').wait(1000)
});
Then(/^Message "([^"]*)"$/, (messUploadFile) => {
    cy.wait('@uploadFile').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.get('.ant-message-custom-content').as(messUploadFile)
            .should('be.visible')
            .should("contain.text", messUploadFile)
    })
});
