/**
* Load required packages
*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var todoController = require('./server-side/controllers/todo.js');

/**
* Connect to the todolist MongoDB
*/
mongoose.connect('mongodb://localhost:27017/todolistbackbone');


/**
* Create express application
*/
var app = express();

app.use(express.static(__dirname + '/client-side'));
app.use(bodyParser.json());

/**
* Use the body-parser package application
*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/**
* Create express router
*/
var router = express.Router();

/**
* Create endpoint handlers for /todoitems
*/
router.route('/todoitems')
  .post(todoController.postTodos)
  .get(todoController.getTodos);

/**
* Create endpoint handlers for /todoitems/:id
*/
router.route('/todoitems/:id')
  .put(todoController.putTodo)
  .delete(todoController.deleteTodo);

/**
* Register all our routes with /api
*/
app.use('/api', router);


var port = 3000;
app.listen(port);
console.log('server on '+port);
