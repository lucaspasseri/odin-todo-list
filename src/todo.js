class Todo {
	#id;
	#title;
	#description;
	#done;
	#startDate;
	#endDate;
	#deadline;
	#priority;

	constructor(
		title = "(empty)",
		description = "(empty)",
		done = false,
		priority = 0,
		startDate = new Date(),
		deadline = "(empty)"
	) {
		this.#id = crypto.randomUUID();
		this.#title = title;
		this.#description = description;
		this.#done = done;
		this.#priority = priority;
		this.#startDate = startDate;
		this.#deadline = deadline;
	}

	toggleDone() {
		if (!this.#done) {
			this.#endDate = new Date();
		}
		this.#done = !this.#done;
	}

	updateTitle(title) {
		this.#title = title;
	}

	updateDescription(description) {
		this.#description = description;
	}

	get data() {
		return {
			id: this.#id,
			title: this.#title,
			description: this.#description,
			done: this.#done,
			priority: this.#priority,
			startDate: this.#startDate,
			endDate: this.#endDate,
			deadline: this.#deadline,
		};
	}

	// updatePriority
	// updateStartDate
	// updateDeadline
}
