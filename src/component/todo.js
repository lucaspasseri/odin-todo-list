import * as styles from "../style/todo.module.css";
import renderCloseButton from "./closeButton";
import renderDoneButton from "./doneButton";
import renderTextInput from "./textInput";
import createEditButton from "./editButton";

export default function renderTodo(todo, project) {
	const container = document.createElement("li");
	container.id = todo.id;
	container.className = styles.todo;

	const title = renderTextInput(todo.title || "", todo.isEditActive);

	const description = renderTextInput(
		todo.description || "",
		todo.isEditActive
	);

	const doneButton = renderDoneButton(todo);

	const priority = document.createElement("p");
	priority.textContent = todo.priority || "";

	const startDate = document.createElement("p");
	startDate.textContent =
		todo.startDate instanceof Date ? todo.startDate.toLocaleString() : "";

	// const endDate = document.createElement("p");
	// endDate.textContent = todo.endDate || "";

	const deadline = document.createElement("p");
	deadline.textContent = todo.deadline || "";

	const closeButton = renderCloseButton(project, todo.id);

	const editButton = createEditButton(todo);

	container.append(
		title,
		closeButton,
		description,
		doneButton,
		// priority,
		startDate,
		// endDate,
		// deadline
		editButton
	);

	return container;
}
