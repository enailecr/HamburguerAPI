const controller = require('../controllers/carrinhoController');

module.exports = (app) => {
    app.post('/carrinho/', controller.insert);
    app.put('/carrinho/:id', controller.updateOne);
}