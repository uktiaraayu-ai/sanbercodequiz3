import ForgotPasswordPage from '../../pages/ForgotPasswordPage';
import LoginPage from '../../pages/LoginPage';

const forgotPasswordPage = new ForgotPasswordPage();
const loginPage = new LoginPage();

describe('OrangeHRM Forgot Password Feature', () => {

  beforeEach(() => {
    loginPage.visit();
  });

  it('Forgot your Password dapat diklik dan membuka halaman Reset Password', () => {
    loginPage.forgotPasswordLink().click();

    cy.url().should('include', '/requestPasswordResetCode');
    forgotPasswordPage.forgotPasswordTitle().should('be.visible');
  });

  it('Terdapat Forgot Password di bawah button Login', () => {
    loginPage.loginButton().should('be.visible');
    loginPage.forgotPasswordLink().should('be.visible');
    loginPage.loginButton().then(($button) => {
      loginPage.forgotPasswordLink().then(($link) => {
        expect($link.offset().top).to.be.greaterThan($button.offset().top);
      });
    });
  });

  it('Terdapat inline error Required jika username tidak diisi', () => {
    loginPage.forgotPasswordLink().click();
    forgotPasswordPage.resetButton().click();

    forgotPasswordPage.requiredError().should('be.visible');
  });

  it('Button Reset Password menjadi primary button CTA di halaman', () => {
    loginPage.forgotPasswordLink().click();

    forgotPasswordPage.resetButton()
      .should('be.visible')
      .and('contain', 'Reset Password')
      .and('have.class', 'oxd-button--secondary');
  });

  it('Tombol Cancel mengembalikan user ke halaman login', () => {
    loginPage.forgotPasswordLink().click();
    forgotPasswordPage.cancelButton().click();

    cy.url().should('include', '/auth/login');
    loginPage.loginButton().should('be.visible');
  });

  it('Pengguna dapat melakukan Reset Password dengan username yang benar', () => {
    loginPage.forgotPasswordLink().click();

    forgotPasswordPage.resetPasswordWithIntercept('Admin').its('response.statusCode').should('be.oneOf', [200, 302]);
    forgotPasswordPage.successMessage().should('be.visible');
  });

  it('Pengguna diarahkan ke halaman selanjutnya setelah input username benar dan klik Reset Password', () => {
    loginPage.forgotPasswordLink().click();

    forgotPasswordPage.resetPasswordWithIntercept('Admin');

    cy.url().should('include', '/sendPasswordReset');
    forgotPasswordPage.instructionMessage().should('be.visible');
  });

  it('Terdapat pop up atau pesan Reset Password berhasil setelah username benar', () => {
    loginPage.forgotPasswordLink().click();

    forgotPasswordPage.resetPasswordWithIntercept('Admin');

    forgotPasswordPage.successMessage().should('be.visible');
  });
});
