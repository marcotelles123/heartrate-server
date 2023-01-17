const { Router } = require ('express');
const { authJwt } = require("../middlewares");
const RateController = require ('../controllers/rates.controller.js');
const routes = Router();

routes.get('/rates', RateController.index);
routes.get('/averages', RateController.average);
routes.post('/rates', RateController.store);
routes.delete('/rates/:id', RateController.delete);

module.exports = routes;