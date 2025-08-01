import * as styles from "../style/todoAccordion.module.css";
import renderCloseButton from "./closeButton";
import renderDoneButton from "./doneButton";
import renderTextInput from "./textInput";
import createEditButton from "./editButton";
import createCapsuleAccordion from "./capsuleAccordion";
import render from "./projectList";

function header(todo) {
	const container = document.createElement("div");
	container.className = styles.header;
	const title = renderTextInput(todo, "title");
	container.appendChild(title);
	return container;
}

function body(todo) {
	const container = document.createElement("div");
	container.className = styles.body;
	container.id = `body-${todo.id}`;

	if (todo.isEditActive) {
		container.classList.add(styles.open);
	}

	const description = renderTextInput(todo, "description");
	container.appendChild(description);
	return container;
}

function footer(todo) {
	const container = document.createElement("div");
	container.className = styles.footer;
	const editButton = createEditButton(todo);
	container.appendChild(editButton);
	return container;
}

export default function createTodo(todo) {
	const accordion = createCapsuleAccordion({
		headerEl: header(todo),
		bodyEl: body(todo),
		footerEl: footer(todo),
	});
	return accordion;
}

// export default function renderTodo(todo, project) {
// 	const container = document.createElement("li");
// 	container.id = todo.id;
// 	container.className = styles.todo;

// 	const title = renderTextInput(todo, "title");

// 	const description = renderTextInput(todo, "description");

// 	const doneButton = renderDoneButton(todo);

// 	const priority = document.createElement("p");
// 	priority.textContent = todo.priority || "";

// 	const startDate = document.createElement("p");
// 	startDate.textContent =
// 		todo.startDate instanceof Date ? todo.startDate.toLocaleString() : "";

// 	// const endDate = document.createElement("p");
// 	// endDate.textContent = todo.endDate || "";

// 	const deadline = document.createElement("p");
// 	deadline.textContent = todo.deadline || "";

// 	const closeButton = renderCloseButton(project, todo.id);

// 	const editButton = createEditButton(todo);

// 	container.append(
// 		title,
// 		closeButton,
// 		description,
// 		doneButton,
// 		// priority,
// 		startDate,
// 		// endDate,
// 		// deadline
// 		editButton
// 	);

// 	return container;
// }
