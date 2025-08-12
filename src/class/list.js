import render from "../component/projectList";
import Todo from "./todo"; // Needed for restoration

class List {
	#id;
	#title;
	#list;
	#isEditActive;

	constructor() {
		this.#id = crypto.randomUUID();
		this.#title = "(empty)";
		this.#isEditActive = false;
		this.#list = [];
	}

	get id() {
		return this.#id;
	}

	get list() {
		return [...this.#list];
	}

	get isEditActive() {
		return this.#isEditActive;
	}

	get title() {
		return this.#title;
	}

	set title(value) {
		this.#title = value;
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

	toggleEdit() {
		this.#isEditActive = !this.#isEditActive;
	}

	sortBy(compareFn) {
		this.#list.sort(compareFn);
		render();
	}

	toJSON() {
		return {
			id: this.#id,
			title: this.#title,
			isEditActive: this.isEditActive,
			list: this.#list.map(item => item.toJSON()),
		};
	}

	static fromJSON(data) {
		const list = new List();
		list.#id = data.id;
		list.#title = data.title;
		list.#isEditActive = data.isEditActive;
		list.#list = data.list.map(item => {
			if (item.list) {
				return List.fromJSON(item);
			} else {
				return Todo.fromJSON(item);
			}
		});
		return list;
	}
}

export default List;
