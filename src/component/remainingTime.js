import render from "./projectList";

function updateTime(todo, p, intervalId) {
	const duration = todo.calcRemainingTime().duration;

	if (duration === null) {
		p.textContent = "(NO DEADLINE SET)";
		clearInterval(intervalId);
		return;
	}

	if (duration === false) {
		p.textContent = "(DEADLINE REACHED)";
		clearInterval(intervalId);
		return;
	}

	const transitions = [
		"59 minutes 59 seconds",
		"1 hour 59 minutes 59 seconds",
		"11 hours 59 minutes 59 seconds",
		"23 hours 59 minutes 59 seconds",
		"1 day 23 hours 59 minutes 59 seconds",
	];

	if (transitions.includes(duration)) {
		p.textContent = duration;
		render();
		return;
	}

	p.textContent = duration;
}

export default function createRemainingTime(todo) {
	const container = document.createElement("div");
	const p = document.createElement("p");
	p.id = `rTime-${todo.id}`;

	const initialRemainingTime = todo.calcRemainingTime().duration;

	if (initialRemainingTime === null) {
		p.textContent = "(NO DEADLINE SET)";
		container.appendChild(p);
		return container;
	}

	if (initialRemainingTime === false) {
		p.textContent = "(DEADLINE REACHED)";
		container.appendChild(p);
		return container;
	}

	p.textContent = initialRemainingTime;
	container.appendChild(p);

	const intervalId = setInterval(() => {
		updateTime(todo, p, intervalId);
	}, 1000);

	return container;
}
