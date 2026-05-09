import DashboardPage from '../../pages/DashboardPage';
import DirectoryPage from '../../pages/DirectoryPage';

const dashboardPage = new DashboardPage();
const directoryPage = new DirectoryPage();

describe('OrangeHRM Dashboard dan Directory Feature', () => {

  beforeEach(() => {
    dashboardPage.login();
    cy.url().should('include', '/dashboard');
  });

  it('User berhasil mengakses Dashboard setelah login valid', () => {
    dashboardPage.header().should('be.visible');
  });

  it('Widget dashboard dapat muncul dengan benar', () => {
    dashboardPage.widgets()
      .should('have.length.at.least', 1)
      .each(($widget) => {
        cy.wrap($widget).should('be.visible');
      });
  });

  it('Photo profile dapat muncul dengan benar', () => {
    dashboardPage.profilePhoto()
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('Sidebar Navigation Menu dapat diklik menuju Directory', () => {
    directoryPage.openWithIntercept().its('response.statusCode').should('eq', 200);

    cy.url().should('include', '/directory/viewDirectory');
    directoryPage.directoryHeader().should('be.visible');
  });

  it('Menu Admin yang diklik memunculkan page Admin/User Management', () => {
    cy.intercept('GET', '**/web/index.php/api/v2/admin/users**').as('adminUsersRequest');
    dashboardPage.adminMenu().click();

    cy.wait('@adminUsersRequest').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/admin/viewSystemUsers');
    cy.contains('User Management').should('be.visible');
  });

  it('Terdapat shading ketika kursor diarahkan ke menu sidebar', () => {
    dashboardPage.adminMenu()
      .trigger('mouseover')
      .should('be.visible')
      .and('have.css', 'cursor', 'pointer');
  });

  it('Logo OrangeHRM tampil dengan baik pada halaman dashboard', () => {
    dashboardPage.logo()
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('Sidebar dapat diperkecil', () => {
    dashboardPage.sidebar().should('not.have.class', 'toggled');
    dashboardPage.sidebarToggleButton().click();

    dashboardPage.sidebar().should('have.class', 'toggled');
  });

  it('Search menu di sidebar berfungsi dengan baik', () => {
    dashboardPage.sidebarSearchField().type('Directory');

    dashboardPage.sidebarMenuItem('Directory').should('be.visible');
    dashboardPage.sidebarMenu().should('not.contain', 'Admin');
  });

  it('Account Dropdown Menu dapat berfungsi', () => {
    dashboardPage.profileDropdown().click();

    dashboardPage.profileDropdownMenu().should('be.visible');
    cy.contains('.oxd-dropdown-menu a', 'About').should('be.visible');
    cy.contains('.oxd-dropdown-menu a', 'Logout').should('be.visible');
  });

  it('Directory dapat menampilkan daftar employee', () => {
    directoryPage.openWithIntercept().its('response.statusCode').should('eq', 200);

    directoryPage.employeeCards().should('have.length.at.least', 1);
  });

  it('Directory search dapat digunakan dan request ter-intercept', () => {
    directoryPage.openWithIntercept();
    directoryPage.searchEmployeeWithIntercept('a').its('response.statusCode').should('eq', 200);

    cy.contains('Records Found').should('be.visible');
  });

  it('Directory reset button mengosongkan pencarian employee', () => {
    directoryPage.openWithIntercept();
    directoryPage.searchEmployeeWithIntercept('a');
    directoryPage.resetSearchWithIntercept().its('response.statusCode').should('eq', 200);

    directoryPage.employeeNameField().should('have.value', '');
  });
});
