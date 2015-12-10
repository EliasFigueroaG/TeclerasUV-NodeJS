var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  insertar = require('../queries/insertarpregunta.js');

module.exports = function(app){
     var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

   router.get('/docente/realizar/:codigo/:id_pregunta', auth_docente, function(request, response, next) {
    console.log("id usuario:",request.session.name, "tipo:", request.session.tipo);
    response.render('docenteconfirmarpregunta', {
      codigo:'a',
      preguntas:['q', '2']
    });
  })




  app.use('/', router);
  router.post("/enviarpregunta", auth_docente,function(request, response, next){
     console.log(request.body)
    insertar.consultas.insertar_pregunta(time,request.params.codigo, re.params.id_pregunta);

  
   })
};