var TodoItemView = Backbone.View.extend(
/** @lends module:client-side/views/TodoItemsView.prototype */
	{
	tagName: 'li',
	/**
	* @constructor
	* @augments Backbone.View
	*/
	initialize: function(options){
		if (!(options && options.model))
			throw new Error("Model is not specified");
		this.model.on("change", this.render, this);
	},

	events: {
		"click .toggle": "onClickToggle",
		"click .delete": "onClickDelete",
		"click .edit": "onClickEdit",
		"click .update": "onClickUpdate"
	},

	onClickUpdate: function(){
		this.model.set('title', $('.amend').val());
		this.model.save();

	},

	onClickEdit: function(todoItem){
		var title = this.model.get('title');
		var html = '<input class="amend" type="text" value="' + title;
		html += '"><button class="update">Update</button>';
		this.$el.html(html);

	},

	onClickDelete: function(){
		this.model.destroy();
	},

	onClickToggle: function(){
		this.model.toggle();
		this.model.save();
	},

	render: function(){
		this.$el.attr("id", this.model.id)
		this.$el.toggleClass('completed', this.model.get("completed"));

		var template = $('#todoItemTemplate').html();
		var html = Mustache.render(template, this.model.toJSON());
		this.$el.html(html);

		return this;
	}
});
