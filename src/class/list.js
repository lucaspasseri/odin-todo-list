import render from "../component/projectList";
import Todo from "./todo"; // Needed for restoration

class List {
	#id;
	#list;

	constructor() {
		this.#id = crypto.randomUUID();
		this.#list = [];
	}

	get id() {
		return this.#id;
	}

	get list() {
		return [...this.#list];
	}

	add(item) {
		this.#list.push(item);
	}

	getItemById(id) {
		return this.#list.find(item => item.id === id);
	}

	deleteItemById(id) {
		const index = this.#list.findIndex(item => item.id === id);
		if (index !== -1) {
			this.#list.splice(index, 1);
		}
	}

	sortBy(compareFn) {
		this.#list.sort(compareFn);
		render();
	}

	// ----------------
	// Persistence helpers
	// ----------------
	toJSON() {
		return {
			id: this.#id,
			list: this.#list.map(item => item.toJSON()), // works for both List and Todo
		};
	}

	static fromJSON(data) {
		const list = new List();
		list.#id = data.id;
		list.#list = data.list.map(item => {
			// Check if it's a Todo or another List
			if (item.list) {
				// Nested list
				return List.fromJSON(item);
			} else {
				// Todo
				return Todo.fromJSON(item);
			}
		});
		return list;
	}
}

export default List;
