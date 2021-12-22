const { Router } = require ('express');
const { authJwt } = require("../middlewares");
const BillsController = require ('../controllers/bills.controller.js');
const routes = Router();

routes.get('/bills', [authJwt.verifyToken], BillsController.index);
routes.post('/bills', [authJwt.verifyToken], BillsController.store);
routes.put('/bills/:id', [authJwt.verifyToken], BillsController.update);
routes.delete('/bills/:id', [authJwt.verifyToken], BillsController.delete);

module.exports = routes;