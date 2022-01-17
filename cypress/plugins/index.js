/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const faker = require("faker");

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  on("task", {
    freshIngrediente() {
      return {
        valor: faker.commerce.price(),
        nome: faker.name.firstName(),
      };
    },
    freshHamburguer() {
      return {
        nome: faker.name.firstName(),
        ingredientes: [
          {
            ingrediente: faker.commerce.price(),
            qtd: 3
          }
        ]
      };
    }
  });
  return config;
}
