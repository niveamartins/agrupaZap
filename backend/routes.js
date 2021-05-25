const express = require('express');

const grupoController = require("./api/controllers/grupoController")

const routes = express.Router();

routes.get("/api/grupos", grupoController.lista)
routes.post("/api/grupo", grupoController.create)
routes.get("/api/invite", grupoController.invitePrivado)


module.exports = routes;