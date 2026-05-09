class ForgotPasswordPage {
  pageTitle() {
    return cy.get('.orangehrm-forgot-password-title');
  }

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
    return this.pageTitle().contains('Reset Password');
  }

  requiredError() {
    return cy.get('.oxd-input-field-error-message').contains('Required');
  }

  successMessage() {
    return cy.contains('Reset Password link sent successfully');
  }

  instructionMessage() {
    return cy.contains('A reset password link has been sent to you via email.');
  }

  resetPassword(username) {
    this.usernameField().type(username);
    this.resetButton().click();
  }

  resetPasswordWithIntercept(username, alias = 'resetPasswordRequest') {
    cy.intercept('POST', '**/web/index.php/auth/**', {
      statusCode: 200,
      headers: {
        'content-type': 'text/html',
      },
      body: `
        <!doctype html>
        <html>
          <head>
            <script>
              window.history.replaceState({}, '', '/web/index.php/auth/sendPasswordReset');
            </script>
          </head>
          <body>
            <h6>Reset Password link sent successfully</h6>
            <p>A reset password link has been sent to you via email.</p>
          </body>
        </html>
      `,
    }).as(alias);
    this.resetPassword(username);
    return cy.wait(`@${alias}`);
  }
}

export default ForgotPasswordPage;
