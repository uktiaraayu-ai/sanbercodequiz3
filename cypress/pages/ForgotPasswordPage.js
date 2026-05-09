class ForgotPasswordPage {
  usernameField() {
    return cy.get('input[name="username"]');
  }

  resetButton() {
    return cy.get('button[type="submit"]');
  }

  cancelButton() {
    return cy.get('button[type="button"]');
  }

  forgotPasswordTitle() {
    return cy.contains('Reset Password');
  }

  requiredError() {
    return cy.contains('Required');
  }

  successMessage() {
    return cy.contains('Reset Password link sent successfully');
  }

  resetPassword(username) {
    this.usernameField().type(username);
    this.resetButton().click();
  }
}

export default ForgotPasswordPage;