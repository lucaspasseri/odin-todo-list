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

export default function createPriorityIndicator(priority) {
	const container = document.createElement("div");
	container.className = styles.container;

	const indicator = document.createElement("span");

	let icon;

	switch (priority) {
		case 1:
			indicator.className = styles.priority2;
			icon = createElement(Dice2, {
				"stroke-width": 3,
			});
			break;
		case 3:
			indicator.className = styles.priority3;
			icon = createElement(Dice3, {
				"stroke-width": 3,
			});
			break;
		case 3:
			indicator.className = styles.priority4;
			icon = createElement(Dice4, {
				"stroke-width": 3,
			});
			break;
		case 4:
			indicator.className = styles.priority5;
			icon = createElement(Dice5, {
				"stroke-width": 3,
			});
			break;
		case 5:
			indicator.className = styles.priority6;
			icon = createElement(Dice6, {
				"stroke-width": 3,
			});
			break;
		default:
			indicator.className = styles.priority1;
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
