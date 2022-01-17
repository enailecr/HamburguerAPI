const express = require('express');
const consign = require('consign');

const config = require('./config');

module.exports = () => {
  const app = express();
  
  app.set('port', config.PORT);
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Configuracao de rotas
  consign({
    cwd: 'src',
    verbose: true,
    extensions: ['.js'],
  })
    .include('routes')
    .into(app);

  return app;
};