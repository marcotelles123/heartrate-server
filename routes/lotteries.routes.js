const { Router } = require ('express');
const LoteriasController = require ('../controllers/loterias.controller');
const { authJwt } = require("../middlewares");
const routes = Router();


routes.post('/lottery', LoteriasController.calculemyhits);
module.exports = routes;