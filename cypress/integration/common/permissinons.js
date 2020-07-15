import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";
import {getHashFromFile, getHashFromFolder} from "../../support/commands";

Then(/^"([^"]*)" option from pop-up window is not visible$/,  () => {
  cy.get('#form_in_modal_permissions').should('not.be.visible')
});

Then(/^The user open Shared with me$/,  () => {
  // cy.wait('@getFolder').then((xhr) => {
  //   expect(xhr.responseBody).to.not.have.property('stack')
    cy.server()
    cy.route('GET', '/api/v1/folder/*').as('getFolder')
    cy.get('.shared').should('be.visible').click()
  // })
});

Then(/^Button "([^"]*)" "([^"]*)"$/,  (btn, visible) => {
  switch (btn) {
    case 'Revoke access':
      btn = '.revokeAccess'
      break;
  }
  cy.contains(btn).should(visible)
});

Given(/^The user 1 is the owner of the folder "([^"]*)"$/, () => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    Cypress.env('foldersInRoot', xhr.responseBody.folder.folders)
    expect(xhr.responseBody.folder.ownerId).to.equal(Cypress.env('login'))
  })
});

When(/^The user press the "([^"]*)" button in "([^"]*)" "([^"]*)"$/, (action, name, obj) => {
  let hash;
  cy.wait(1000)
  switch (action) {
    case 'Access list':
      action = 'Permissions';
      break;
  }
  switch (obj) {
    case 'folder':
      obj = 'folder';
      hash = getHashFromFolder(name, Cypress.env('foldersInRoot'));
      break;
    case 'file':
      obj = 'file';
      hash = getHashFromFile(name, Cypress.env('filesInRoot'));
      break;
  }
  if (hash === undefined) {
    cy.get(`#${action}_${Cypress.env('rootFolder')}`).click().wait(1000)
  } else {
    cy.get(`#${action}_${hash}`).click().wait(1000)
  }
});


Then(/^User 2 became Owner of "([^"]*)" folder$/, (folder) => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    expect(1).to.equal(xhr.responseBody.folder.folders.length)
    cy.contains(folder).should('be.visible')
  })
});

When(/^The "([^"]*)" sends a request to grant "([^"]*)" access to the "([^"]*)" "([^"]*)" to "([^"]*)"$/,
  (fromUser, permission, object, name, toUser) => {
    const headers = {
      'content-type': 'application/json'
    }
    switch (fromUser) {
      case 'User1':
        headers.Authorization = `Bearer ${Cypress.env('token')}`;
        break;
      case 'User2':
        headers.Authorization = `Bearer ${Cypress.env('token_2')}`;
        break;
      case 'User3':
        headers.Authorization = `Bearer ${Cypress.env('token_3')}`;
        break;
    } switch (toUser) {
      case 'User1':
        toUser = Cypress.env('email');
        break;
      case 'User2':
        toUser = Cypress.env('email_2');
        break;
      case 'User3':
        toUser = Cypress.env('email_3');
        break;
    } switch (permission) {
      case 'edit':
        permission = 'write';
        break;
      case 'view':
        permission = 'read';
        break;
    } switch (object) {
      case 'file':
        object = getHashFromFile(name, Cypress.env('filesInRoot'));
        break;
      case 'folder':
        object = getHashFromFolder(name, Cypress.env('foldersInRoot'));
        break;
    }
    cy.request({
      method: 'PUT',
      url: `${Cypress.env('backendURL')}/permissions`,
      headers: headers,
      body: {
        'email': toUser,
        'hash': object,
        'permission': permission
      },
      failOnStatusCode: false
    }).then((resp) => {
      Cypress.env('respStatus', resp.status)
      Cypress.env('respBody', resp.body)
    })
  });
