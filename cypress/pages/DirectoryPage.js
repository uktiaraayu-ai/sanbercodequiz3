class DirectoryPage {
  directoryMenu() {
    return cy.contains('Directory');
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
    return cy.contains('Directory');
  }

  searchEmployee(name) {
    this.employeeNameField().type(name);
    this.searchButton().click();
  }
}

export default DirectoryPage;