/**
* This class requires the todo model {@link module:models/todo}
**/
var TodoItem = require('../models/todo');


/**
* These methods perform CRUD operations.
* @module controllers/todo
*/

/** GET request on /api/todoitems
* @param {req} x - The request value.
* @param {res} y - The response value.
*/
exports.getTodos = function(req, res) {
	/**
	* @param {err} x - err is an object which describes that error.
	* @param {docs} y - docs is an array with all the documents returned by the cursor.
	*/
	TodoItem.find(function(err, docs) {
		/** To get all item one by one */
		docs.forEach(function(item) {
			console.log("Received a GET request for _id: " + item._id);
		});
		/** Send the documents to the response */
		res.send(docs);
	});
}

/** POST request on /api/todoitems
* @param {req} x - The request value.
* @param {res} y - The response value.
**/
exports.postTodos = function(req, res) {
	console.log('Received a POST request:')
	for (var key in req.body) {
		console.log(key + ': ' + req.body[key]);
	}
	var todoItem = new TodoItem(req.body);
	todoItem.save(function(err, doc) {
		res.send(doc);
	});
}

/** DELETE request on /api/todoitems/:id
* @param {req} x - The request value.
* @param {res} y - The response value.
**/
exports.deleteTodo = function(req, res) {
	console.log('Received a DELETE request for _id: ' + req.params.id);
	TodoItem.remove({_id: req.params.id}, function(err, doc) {
		res.send({_id: req.params.id});
	});
}


/** PUT request on /api/todoitems/:id
* @param {req} x - The request value.
* @param {res} y - The response value.
**/
exports.putTodo = function(req, res) {
	console.log('Received an UPDATE request for _id: ' + req.params.id);
	TodoItem.findById(req.params.id, function(err, item) {
		/** To catch whether the error or not. */
		if (err) { res.send(err); }

		/**
		* Update the existing item model
		*/
		item.title = req.body.title;
		item.completed = req.body.completed;

		/**
		* Save the item model and check for errors
		**/
		item.save(function(err) {
			if (err) { res.send(err); }
			res.json(item);
		});
	});
}
