import {
	format,
	addDays,
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
} from "date-fns";

class Todo {
	#id;
	#title;
	#description;
	#done;
	#startDate;
	#endDate;
	#deadline;
	#priority;
	#urgency;
	#isEditActive;

	constructor(
		title = "(empty)",
		description = "(empty)",
		done = false,
		priority = 0,
		urgency = 1,
		startDate = format(new Date(), "yyyy-MM-dd'T'HH:mm"),
		deadline = format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
		isEditActive = false
	) {
		this.#id = crypto.randomUUID();
		this.#title = title;
		this.#description = description;
		this.#done = done;
		this.#priority = priority;
		this.#urgency = urgency;
		this.#startDate = startDate;
		this.#deadline = deadline;
		this.#isEditActive = isEditActive;

		const getters = {
			id: () => this.#id,
			title: () => this.#title,
			description: () => this.#description,
			done: () => this.#done,
			priority: () => this.#priority,
			urgency: () => {
				const now = format(new Date(), "yyyy-MM-dd'T'HH:mm");
				const daysDif = differenceInDays(this.#deadline, now);
				const hoursDif = differenceInHours(this.#deadline, now);
				const minutesDif = differenceInMinutes(this.#deadline, now);

				if (daysDif > 2) {
					return 0;
				}

				if (daysDif > 1) {
					return 1;
				}
				if (hoursDif > 12) {
					return 2;
				}

				if (hoursDif > 1) {
					return 3;
				}
				if (minutesDif > 30) {
					return 4;
				}
				return 5;
			},
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

			startDate: value => {
				this.#startDate = value;
			},

			deadline: value => {
				this.#deadline = value;
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
			const now = new Date();
			const startDate = format(now, "yyyy-MM-dd'T'HH:mm");
			this.#endDate = startDate;
		}
		this.#done = !this.#done;
	}
}

export default Todo;
