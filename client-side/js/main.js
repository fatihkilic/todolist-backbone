/**
* Construct the front-end
* @constructor
**/
$(document).ready(function(){
	var todos = new Todos();
	var todoItemsView = new TodoItemsView({ model: todos });
	$("body").append(todoItemsView.render().$el);
});
