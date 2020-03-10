const { Router } = require ('express');
const RateController = require ('./controllers/RateController');
const routes = Router();

routes.get('/rates', RateController.index);
routes.post('/rates', RateController.store);
routes.delete('/rates/:id', RateController.delete);

module.exports = routes;