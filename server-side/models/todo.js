/** Load required packages */
var mongoose = require('mongoose');

/**
* Define our TodoItemSchema
* These are two properties
* @module models/todo
*/
var TodoItemSchema = new mongoose.Schema({
  /** @type {string} */
  title: String,
  /** @type {boolean} */
  completed: Boolean
});

/**
 * Export to the Mongoose Model as TodoItem
 */
module.exports = mongoose.model('TodoItem', TodoItemSchema);
