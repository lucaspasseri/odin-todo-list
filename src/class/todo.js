import { format, formatDuration, parseISO, intervalToDuration } from "date-fns";

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
		deadline,
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

	toJSON() {
		const serializeDate = value => {
			if (value instanceof Date) return value;
			return null;
		};
		return {
			id: this.#id,
			title: this.#title,
			description: this.#description,
			done: this.#done,
			priority: this.#priority,
			startDate: serializeDate(this.#startDate),
			endDate: serializeDate(this.#endDate),
			deadline: serializeDate(this.#deadline),
			isEditActive: this.#isEditActive,
		};
	}

	static fromJSON(data) {
		const todo = new Todo(
			data.title,
			data.description,
			data.done,
			data.priority,
			data.startDate ? new Date(data.startDate) : null,
			data.deadline ? new Date(data.deadline) : null,
			data.isEditActive
		);

		todo.#id = data.id;
		todo.#endDate = data.endDate ? new Date(data.endDate) : null;

		return todo;
	}

	toggleEdit() {
		console.log(1, this.#isEditActive);
		this.#isEditActive = !this.#isEditActive;
		console.log(2, this.#isEditActive);
	}

	toggleDone() {
		if (!this.#done) {
			const now = new Date();
			const startDate = format(now, "yyyy-MM-dd'T'HH:mm");
			this.#endDate = startDate;
		}
		this.#done = !this.#done;
	}

	calcRemainingTime() {
		if (!this.#deadline) {
			return { duration: null, urgency: -1 };
		}

		const now = new Date();

		if (now > this.#deadline) {
			return { duration: false, urgency: 0 };
		}

		const duration = intervalToDuration({ start: now, end: this.#deadline });

		const allZero = Object.values(duration).every(unit => unit === 0);
		if (allZero) {
			return { duration: false, urgency: 0 };
		}

		const formattedDuration = formatDuration(duration);
		const dayMatch = formattedDuration.match(/(\d+)\s+days?/);
		const hourMatch = formattedDuration.match(/(\d+)\s+hours?/);
		const days = dayMatch ? parseInt(dayMatch[1], 10) : 0;
		const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;

		if (days >= 2) return { duration: formattedDuration, urgency: 1 };
		if (days >= 1) return { duration: formattedDuration, urgency: 2 };
		if (hours >= 12) return { duration: formattedDuration, urgency: 3 };
		if (hours >= 1) return { duration: formattedDuration, urgency: 4 };
		return { duration: formattedDuration, urgency: 5 };
	}
}

export default Todo;

// calcTodoProgress() {
// 	const maxDaysDif = differenceInDays(this.#deadline, this.#startDate);
// 	const maxHoursDif = differenceInHours(this.#deadline, this.#startDate);
// 	const maxMinutesDif = differenceInMinutes(this.#deadline, this.#startDate);

// 	const now = format(new Date(), "yyyy-MM-dd'T'HH:mm");
// 	const daysDif = differenceInDays(now, this.#startDate);
// 	const hoursDif = differenceInHours(now, this.#startDate);
// 	const minutesDif = differenceInMinutes(now, this.#startDate);

// 	const output = {
// 		maxValue: 0,
// 		currValue: 0,
// 		unit: "min",
// 	};

// 	if (maxDaysDif > 1) {
// 		output.maxValue = maxDaysDif;
// 		output.currValue = daysDif;
// 		output.unit = "days";
// 		return output;
// 	}

// 	if (maxHoursDif > 1) {
// 		output.maxValue = maxHoursDif;
// 		output.currValue = hoursDif;
// 		output.unit = "hours";
// 		return output;
// 	}

// 	output.maxValue = maxMinutesDif;
// 	output.currValue = minutesDif;
// 	return output;
// }

// calcUrgency() {
// 	const now = format(new Date(), "yyyy-MM-dd'T'HH:mm");
// 	const daysDif = differenceInDays(this.#deadline, now);
// 	const hoursDif = differenceInHours(this.#deadline, now);
// 	const minutesDif = differenceInMinutes(this.#deadline, now);

// 	let output = 5;

// 	if (daysDif > 2) {
// 		output = 0;
// 	}
// 	if (daysDif > 1) {
// 		output = 1;
// 	}
// 	if (hoursDif > 12) {
// 		output = 2;
// 	}
// 	if (hoursDif > 1) {
// 		output = 3;
// 	}
// 	if (minutesDif > 30) {
// 		output = 4;
// 	}

// 	return output;
// }
