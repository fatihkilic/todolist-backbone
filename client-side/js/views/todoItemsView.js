Backbone.Model.prototype.idAttribute = '_id';
var TodoItemsView = Backbone.View.extend(
		/** @lends module:client-side/views/TodoItemsViews.prototype */
	{
	id: "todoItemsContainer",

	/**
	* @constructor
	* @augments Backbone.View
	*/

	initialize: function(options){
		if(!(options && options.model))
			throw new Error("Model is not specified");
		this.model.on("add", this.onAddTodoItem, this);
		this.model.on("remove", this.onRemoveTodoItem, this);
		this.model.fetch();

	},

	onRemoveTodoItem: function(todoItem){
		this.$("li#"+todoItem.id).remove();
	},

	onAddTodoItem: function(todoItem){
		var view = new TodoItemView({model: todoItem});
		this.$('#todoItems').append(view.render().$el);
	},

	events: {
		"keypress #newTodoItem": "onKeyPress"
	},

	onKeyPress: function(e) {
		if (e.keyCode == 13) {
			var $textBox = this.$('#newTodoItem');

			if ($textBox.val()) {
				var todo = new Todo({
					title: $textBox.val()
				});
				this.model.add(todo);
				todo.save();
				$textBox.val('');
			}
		}

	},

	render: function (){
		var template = $("#todoItemsTemplate").html();
		var html = Mustache.render(template);
		this.$el.html(html);
		return this;
	}
});
