const controller = require('../controllers/ingredienteController');

module.exports = (app) => {
    app.get('/ingrediente/:id', controller.getOne);
    app.get('/ingredientes/', controller.getAll);
    app.post('/ingredientes/', controller.insert);
    app.delete('/ingredientes/:id', controller.deleteOne);
}