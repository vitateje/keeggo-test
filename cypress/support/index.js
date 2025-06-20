// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  // Checks if error message contain string
  if (err.message.includes('b.cardModuleFactory is not a function')) {
    // False to fail tests
    console.error('Exceção não capturada da aplicação ignorada:', err.message);
    return false;
  }
  return true;
});

// Import Mochawesome reporter
import 'cypress-mochawesome-reporter/register';

beforeEach(() => {
   
});
// Alternatively, you can use CommonJS syntax:
// require('./commands')