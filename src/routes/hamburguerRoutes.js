const controller = require('../controllers/HamburguerController');

module.exports = (app) => {
    app.get('/hamburguer/:id', controller.getOne);
    app.get('/hamburguers/', controller.getAll);
    app.post('/hamburguers/', controller.insert);
    app.delete('/hamburguers/:id', controller.deleteOne);
    app.put('/hamburguers/:id', controller.updateOne);
}