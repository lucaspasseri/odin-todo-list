import render from "../component/projectList";

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
}

export default List;
