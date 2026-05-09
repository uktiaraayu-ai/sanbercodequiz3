class DirectoryPage {
  directoryMenu() {
    return cy.get('.oxd-main-menu').contains('Directory');
  }

  employeeNameField() {
    return cy.get('input[placeholder="Type for hints..."]');
  }

  searchButton() {
    return cy.get('button[type="submit"]');
  }

  resetButton() {
    return cy.get('button[type="reset"]');
  }

  directoryHeader() {
    return cy.get('.oxd-topbar-header-breadcrumb').contains('Directory');
  }

  employeeCards() {
    return cy.get('.orangehrm-directory-card');
  }

  noRecordsMessage() {
    return cy.contains('No Records Found');
  }

  searchEmployee(name) {
    this.employeeNameField().type(name);
    this.searchButton().click();
  }

  openWithIntercept(alias = 'directoryRequest') {
    cy.intercept('GET', '**/web/index.php/api/v2/directory/employees**').as(alias);
    this.directoryMenu().click();
    return cy.wait(`@${alias}`);
  }

  searchEmployeeWithIntercept(name, alias = 'directorySearchRequest') {
    cy.intercept('GET', '**/web/index.php/api/v2/directory/employees**').as(alias);
    this.searchEmployee(name);
    return cy.wait(`@${alias}`);
  }

  resetSearchWithIntercept(alias = 'directoryResetRequest') {
    cy.intercept('GET', '**/web/index.php/api/v2/directory/employees**').as(alias);
    this.resetButton().click();
    return cy.wait(`@${alias}`);
  }
}

export default DirectoryPage;
