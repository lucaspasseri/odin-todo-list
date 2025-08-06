import {
	createElement,
	Dice1,
	Dice2,
	Dice3,
	Dice4,
	Dice5,
	Dice6,
} from "lucide";
import * as styles from "../style/priorityIndicator.module.css";

function calcUrgency(todo) {
	const remainingTime = todo.calcRemainingTime();

	if (remainingTime === null) return 0;
	if (remainingTime === false) return 6;
	const dayMatch = remainingTime.match(/(\d+)\s+days?/);
	const hourMatch = remainingTime.match(/(\d+)\s+hours?/);

	const days = dayMatch ? parseInt(dayMatch[1], 10) : 0;
	const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;

	let urgency;

	if (days >= 2) {
		urgency = 1;
	} else if (days >= 1) {
		urgency = 2;
	} else if (hours >= 12) {
		urgency = 3;
	} else if (hours >= 1) {
		urgency = 4;
	} else {
		urgency = 5;
	}
	console.log(days, hours, urgency);
	return urgency;
}

export default function createUrgencyIndicator(todo) {
	const container = document.createElement("div");
	container.className = styles.container;

	const indicator = document.createElement("span");
	let icon;
	let urgency = calcUrgency(todo);

	console.log({ urgency });

	switch (urgency) {
		case 1:
			indicator.className = styles.priority1;
			icon = createElement(Dice2, {
				"stroke-width": 3,
				width: 16,
				height: 16,
			});
			break;
		case 2:
			indicator.className = styles.priority2;
			icon = createElement(Dice3, {
				"stroke-width": 3,
				width: 16,
				height: 16,
			});
			break;
		case 3:
			indicator.className = styles.priority3;
			icon = createElement(Dice4, {
				"stroke-width": 3,
				width: 16,
				height: 16,
			});
			break;
		case 4:
			indicator.className = styles.priority4;
			icon = createElement(Dice5, {
				"stroke-width": 3,
				width: 16,
				height: 16,
			});
			break;
		case 5:
			indicator.className = styles.priority5;
			icon = createElement(Dice6, {
				"stroke-width": 3,
				width: 16,
				height: 16,
			});
			break;
		case 6:
			indicator.className = styles.priority6;
			icon = createElement(Dice6, {
				"stroke-width": 3,
				width: 16,
				height: 16,
			});
			break;
		default:
			indicator.className = styles.priority0;
			icon = createElement(Dice1, {
				"stroke-width": 3,
				width: 16,
				height: 16,
			});
	}

	indicator.appendChild(icon);

	container.appendChild(indicator);
	return container;
}
