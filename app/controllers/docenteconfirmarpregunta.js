var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  queries = require('../queries/index.js');
  insertar= require('../queries/insertarpregunta.js');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  router.get('/docente/realizar', auth_docente, function(request, response, next) {
    response.render('docenteconfirmarpregunta', {});
  });
  router.post("/enviarpregunta", auth_docente, function(request, response, next) {
    insertar.insertarpregunta.insertar_pregunta(request.body.tiempo, request.body.preMaestra, request.body.clase)
      .then(function(insertado_pregunta) {
        console.log("insertado:", insertado_pregunta);
        response.redirect("/docente/realizar");
        return;
      })
      .catch(function(error) {
        console.log(error);
        /*Como ven, acá hay dos redirect, pero no se ejecutan uno y después el otro, ya que cuando entra a un callback, el flujo de ejecución cambia
         */
        response.redirect("/docente/realizar");
      })
  })
}
