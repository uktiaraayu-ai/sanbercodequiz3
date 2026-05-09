class LoginPage {
  visit() {
    cy.visit('/web/index.php/auth/login');
  }

  usernameField() {
    return cy.get('input[name="username"]');
  }

  passwordField() {
    return cy.get('input[name="password"]');
  }

  loginButton() {
    return cy.get('button[type="submit"]');
  }

  forgotPasswordLink() {
    return cy.contains('Forgot your password?');
  }

  errorMessage() {
    return cy.get('.oxd-alert-content-text');
  }

  requiredErrors() {
    return cy.get('.oxd-input-field-error-message');
  }

  login(username, password) {
    this.usernameField().type(username);
    this.passwordField().type(password);
    this.loginButton().click();
  }

  loginWithIntercept(username, password, alias = 'loginRequest') {
    cy.intercept('POST', '**/web/index.php/auth/validate').as(alias);
    this.login(username, password);
    return cy.wait(`@${alias}`);
  }
}

export default LoginPage;
