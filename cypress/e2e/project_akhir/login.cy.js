import LoginPage from '../../pages/LoginPage';

const loginPage = new LoginPage();

describe('OrangeHRM Login Feature', () => {

  beforeEach(() => {
    loginPage.visit();
  });

  it('User berhasil login dengan credential valid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    loginPage.login('Admin', 'admin123');

    cy.wait('@loginRequest');
    cy.url().should('include', '/dashboard');
  });

  it('User gagal login dengan password salah', () => {
    loginPage.login('Admin', 'wrongpassword');

    loginPage.errorMessage().should('contain', 'Invalid credentials');
  });

  it('Muncul error jika username kosong', () => {
    loginPage.passwordField().type('admin123');
    loginPage.loginButton().click();

    cy.contains('Required').should('be.visible');
  });

  it('Muncul error jika password kosong', () => {
    loginPage.usernameField().type('Admin');
    loginPage.loginButton().click();

    cy.contains('Required').should('be.visible');
  });

});