	var Todo = Backbone.Model.extend(
	/** @lends module:client-side/models/Todo.prototype */
	{
		/**
    * This is the model for todo.
    * @augments external:Backbone.Model
    */

	defaults: {
		completed: false
	},

	urlRoot: 'http://localhost:3000/api/todoitems',

	/** Toggle the `completed` state of this todo item. */
	toggle: function(){
		this.set("completed", !this.get("completed"));
	},

	/** Check the @param {title} whether empty or not */
	validate: function(attrs) {
		if(!attrs.title)
			return "title is required";
	}
	});
