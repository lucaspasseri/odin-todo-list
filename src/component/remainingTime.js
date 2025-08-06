import render from "./projectList";

function updateTime(todo, p, intervalId) {
	console.log(1);
	const remainingTime = todo.calcRemainingTime();

	if (remainingTime === null) {
		p.textContent = "(NO DEADLINE SET)";
		clearInterval(intervalId);
		return;
	}

	if (remainingTime === false) {
		p.textContent = "(DEADLINE REACHED)";
		clearInterval(intervalId);
		return;
	}

	p.textContent = remainingTime;
}

export default function createRemainingTime(todo) {
	console.log(2);
	const container = document.createElement("div");
	const p = document.createElement("p");
	p.id = `rTime-${todo.id}`;

	const initialRemainingTime = todo.calcRemainingTime();
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
