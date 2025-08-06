import {
	format,
	addDays,
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
	formatDuration,
	parseISO,
	intervalToDuration,
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
		startDate = new Date(),
		deadline,
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
			urgency: () => this.calcUrgency(),
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

	calcRemainingTime() {
		if (this.#deadline === undefined) {
			return null;
		}

		const now = new Date();
		const deadline = parseISO(this.#deadline);

		if (now > deadline) {
			return false;
		}

		const duration = intervalToDuration({
			start: now,
			end: deadline,
		});

		const allZero = Object.values(duration).every(unit => unit === 0);
		if (allZero) {
			return false;
		}

		return formatDuration(duration);
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
