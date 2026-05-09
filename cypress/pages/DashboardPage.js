class DashboardPage {
  header() {
    return cy.get('.oxd-topbar-header-breadcrumb').contains('Dashboard');
  }

  widgets() {
    return cy.get('.orangehrm-dashboard-widget');
  }

  profilePhoto() {
    return cy.get('.oxd-userdropdown-img');
  }

  profileDropdown() {
    return cy.get('.oxd-userdropdown-tab');
  }

  profileDropdownMenu() {
    return cy.get('.oxd-dropdown-menu');
  }

  sidebar() {
    return cy.get('.oxd-sidepanel');
  }

  sidebarMenu() {
    return cy.get('.oxd-main-menu');
  }

  sidebarMenuItem(menuName) {
    return this.sidebarMenu().contains('.oxd-main-menu-item', menuName);
  }

  adminMenu() {
    return this.sidebarMenuItem('Admin');
  }

  logo() {
    return cy.get('.oxd-brand-banner img');
  }

  sidebarToggleButton() {
    return cy.get('.oxd-main-menu-button');
  }

  sidebarSearchField() {
    return cy.get('input[placeholder="Search"]');
  }

  login(username = 'Admin', password = 'admin123') {
    cy.visit('/web/index.php/auth/login');
    cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait('@loginRequest');
  }
}

export default DashboardPage;
