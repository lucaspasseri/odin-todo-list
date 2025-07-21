import * as styles from "../styles/todo.module.css";

export default function renderTodo(todo) {
	const container = document.createElement("div");
	container.id = todo.id;
	container.className = styles.todo;

	const title = document.createElement("h3");
	title.textContent = todo.title || "";

	const description = document.createElement("p");
	description.textContent = todo.description || "";

	const done = document.createElement("p");
	done.textContent = todo.done || "";

	const priority = document.createElement("p");
	priority.textContent = todo.priority || "";

	const startDate = document.createElement("p");
	startDate.textContent = todo.startDate || "";

	const endDate = document.createElement("p");
	endDate.textContent = todo.endDate || "";

	const deadline = document.createElement("p");
	deadline.textContent = todo.deadline || "";

	container.append(
		title,
		description,
		done,
		priority,
		startDate,
		endDate,
		deadline
	);

	return container;
}
