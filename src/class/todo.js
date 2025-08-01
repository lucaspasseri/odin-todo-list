class Todo {
	#id;
	#title;
	#description;
	#done;
	#startDate;
	#endDate;
	#deadline;
	#priority;
	#isEditActive;

	constructor(
		title = "(empty)",
		description = "(empty)",
		done = false,
		priority = 0,
		startDate = new Date(),
		deadline = "(empty)",
		isEditActive = false
	) {
		this.#id = crypto.randomUUID();
		this.#title = title;
		this.#description = description;
		this.#done = done;
		this.#priority = priority;
		this.#startDate = startDate;
		this.#deadline = deadline;
		this.#isEditActive = isEditActive;

		const getters = {
			id: () => this.#id,
			title: () => this.#title,
			description: () => this.#description,
			done: () => this.#done,
			priority: () => this.#priority,
			startDate: () => this.#startDate,
			endDate: () => this.#endDate,
			deadline: () => this.#deadline,
			isEditActive: () => this.#isEditActive,
		};

		const setters = {
			title: value => {
				this.#title = value;
			},
			description: value => {
				this.#description = value;
			},
		};

		for (const [key, getter] of Object.entries(getters)) {
			Object.defineProperty(this, key, {
				get: getter,
				set: setters[key],
				enumerable: true,
			});
		}
	}

	toggleEdit() {
		this.#isEditActive = !this.#isEditActive;
	}

	toggleDone() {
		if (!this.#done) {
			this.#endDate = new Date();
		}
		this.#done = !this.#done;
	}
}

export default Todo;
