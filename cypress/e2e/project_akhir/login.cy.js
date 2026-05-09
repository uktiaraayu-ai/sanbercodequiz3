import LoginPage from '../../pages/LoginPage';

const loginPage = new LoginPage();

describe('OrangeHRM Login Feature', () => {

  beforeEach(() => {
    loginPage.visit();
  });

  it('User berhasil login dengan credential valid', () => {
    loginPage.loginWithIntercept('Admin', 'admin123').its('response.statusCode').should('be.oneOf', [200, 302]);
    cy.url().should('include', '/dashboard');
  });

  it('User gagal login dengan password salah', () => {
    loginPage.loginWithIntercept('Admin', 'wrongpassword').its('response.statusCode').should('be.oneOf', [200, 302]);

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

  it('Link Forgot your password tampil di bawah button Login', () => {
    loginPage.forgotPasswordLink().should('be.visible');
    loginPage.loginButton().then(($button) => {
      loginPage.forgotPasswordLink().then(($link) => {
        expect($link.offset().top).to.be.greaterThan($button.offset().top);
      });
    });
  });

});
