var Todos = Backbone.Collection.extend(
	/** @lends module:client-side/collections/Todos.prototype */
	{
		/**
		* This collection contains todo model.
		* @type {module:client-side/models/Todo.prototype}
		*/
	model: Todo,
	url: 'http://localhost:3000/api/todoitems'
});
