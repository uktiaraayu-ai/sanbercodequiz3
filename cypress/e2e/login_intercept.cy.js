describe('OrangeHRM Login Feature with Intercept', () => {

  beforeEach(() => { 
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get('input[name="username"]', { timeout: 10000 })
      .should('be.visible');
  });

  it('User berhasil login dengan credential valid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/dashboard');
  });

  it('Menampilkan error jika password salah', () => {
    cy.intercept('GET', '**/core/i18n/messages').as('invalidLogin');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salah');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('Password harus termasking', () => {
    cy.intercept('GET', '**/*.png').as('imageLoad');

    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'password');
  });

  it('Menampilkan error jika field kosong', () => {
    cy.intercept('GET', '**/*.svg').as('emptyCheck');

    cy.get('button[type="submit"]').click();

    cy.contains('Required').should('be.visible');
  });

  it('Menampilkan inline error jika login kosong', () => {
    cy.intercept('GET', '**/*.css').as('emptyLoginAssets');

    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2);
  });

  it('Terdapat tombol Forgot Password', () => {
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('forgotPassword');

    cy.contains('Forgot your password?').click();

    cy.wait('@forgotPassword');

    cy.url().should('include', 'requestPasswordResetCode');
  });

});