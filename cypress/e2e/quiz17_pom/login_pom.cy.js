import LoginPage from '../../pages/LoginPage';

describe('OrangeHRM Login Feature with POM', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.usernameField().should('be.visible');
  });

  it('User berhasil login dengan credential valid', () => {
    cy.fixture('loginData').then((data) => {
      loginPage.login(
        data.validUser.username,
        data.validUser.password
      );

      cy.url().should('include', '/dashboard');
    });
  });

  it('Menampilkan error jika password salah', () => {
    cy.fixture('loginData').then((data) => {
      loginPage.login(
        data.invalidUser.username,
        data.invalidUser.password
      );

      cy.contains('Invalid credentials').should('be.visible');
    });
  });

  it('Password harus termasking', () => {
    loginPage.passwordField()
      .should('have.attr', 'type', 'password');
  });

  it('Menampilkan error jika field kosong', () => {
    loginPage.loginButton().click();

    cy.contains('Required').should('be.visible');
  });

  it('Menampilkan inline error jika login kosong', () => {
    loginPage.loginButton().click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2);
  });

  it('Terdapat tombol Forgot Password', () => {
    loginPage.forgotPasswordLink().click();

    cy.url().should('include', 'requestPasswordResetCode');
  });
});