describe('OrangeHRM Login Feature', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('User berhasil login dengan credential valid', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  it('Menampilkan error jika password salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salah');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('Password harus termasking', () => {
    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'password');
  });

  it('Menampilkan error jika field kosong', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Required').should('be.visible');
  });

  it('Terdapat tombol Forgot Password', () => {
    cy.contains('Forgot your password?').should('be.visible');
  });

});