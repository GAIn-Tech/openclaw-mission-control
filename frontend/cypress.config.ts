import { defineConfig } from "cypress";

export default defineConfig({
  env: {},
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    // Clerk helpers perform async work inside `cy.then()`. CI can be slow enough
    // that Cypress' 4s default command timeout flakes.
    defaultCommandTimeout: 20_000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    setupNodeEvents() {
      return undefined;
    },
  },
});
