class TodoList {
	#list;

	constructor() {
		this.#list = [];
	}

	get list() {
		return [...this.#list];
	}

	add(newTodo) {
		this.#list.push(newTodo);
	}

	deleteTodoById(id) {
		console.log(id);
		if (typeof id === "string") {
			const index = this.#list.findIndex(todo => todo.data.id === id);
			console.log(index);
			if (index !== -1) {
				this.#list.splice(index, 1);
			}
		}
	}

	getTodoById(id) {
		console.log(id);
		if (typeof id === "string") {
			const todo = this.#list.find(todo => todo.data.id === id);
			return todo;
		}
	}
}

export default TodoList;
