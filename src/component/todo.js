import * as styles from "../style/todo.module.css";
import renderCloseButton from "./closeButton";

export default function renderTodo(todo, project) {
	const container = document.createElement("li");
	container.id = todo.id;
	container.className = styles.todo;

	const title = document.createElement("h4");
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

	const closeButton = renderCloseButton(project, todo.id);

	container.append(
		title,
		closeButton,
		description,
		done,
		priority,
		startDate,
		endDate,
		deadline
	);

	return container;
}
