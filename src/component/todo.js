import createCapsuleAccordion from "./capsuleAccordion";
import * as styles from "../style/todo.module.css";
import renderDoneButton from "./doneButton";
import createUrgencyIndicator from "./urgencyIndicator";
import createDeleteButton from "./deleteButton";
import render from "./projectList";
import todoProgress from "./todoProgress";
import createRemainingTime from "./remainingTime";
import projectList from "../state";
import createEditButton from "./editButton";

export function createHeader(todo) {
	if (todo.isEditActive) {
		return createInputHeader(todo);
	}

	return createParagraphHeader(todo);
}

function createParagraphHeader(todo) {
	const container = document.createElement("div");
	container.className = styles.header;
	const p = document.createElement("p");
	p.textContent = todo.title;

	const urgencyIndicator = createUrgencyIndicator(todo);

	container.append(p, urgencyIndicator);

	return container;
}

function createInputHeader(todo) {
	const container = document.createElement("div");
	container.className = styles.header;
	const input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("name", "title");
	input.setAttribute("value", todo.title);

	input.addEventListener("change", e => {
		todo.title = e.target.value;
	});

	const urgencyIndicator = createUrgencyIndicator(todo);
	container.append(input, urgencyIndicator);

	return container;
}

function createBody(project, todo) {
	const container = document.createElement("div");
	container.className = styles.body;

	const innerContainer = document.createElement("div");

	const descriptionInput = document.createElement("input");
	descriptionInput.setAttribute("type", "text");
	descriptionInput.setAttribute("name", "description");
	descriptionInput.setAttribute("value", todo.description);

	descriptionInput.addEventListener("change", e => {
		todo.description = e.target.value;
	});

	const deleteButton = createDeleteButton(project, todo.id);

	const deadlineDatePicker = document.createElement("input");
	deadlineDatePicker.id = `deadline-${todo.id}`;

	deadlineDatePicker.setAttribute("type", "datetime-local");
	deadlineDatePicker.setAttribute("value", todo.deadline);

	deadlineDatePicker.addEventListener("change", e => {
		const value = e.currentTarget.value;
		todo.deadline = value !== "" ? value : undefined;
		localStorage.setItem("projectList", JSON.stringify(projectList));

		render();
	});

	const labelDeadline = document.createElement("label");
	labelDeadline.for = `deadline-${todo.id}`;
	labelDeadline.textContent = "Deadline:";
	labelDeadline.appendChild(deadlineDatePicker);

	// const progressBar = todoProgress(todo);

	const remainingTime = createRemainingTime(todo);

	const labelRemaining = document.createElement("p");
	labelRemaining.setAttribute("aria-labelfor", `rTime-${todo.id}`);
	labelRemaining.textContent = "Remaining time:";
	labelRemaining.appendChild(remainingTime);

	innerContainer.append(
		descriptionInput,
		// doneButton,
		// priorityIndicator,
		// urgencyIndicator,

		// progressBar,
		// remainingTime,
		labelDeadline,
		labelRemaining,
		deleteButton
		// deadlineDatePicker
	);

	container.appendChild(innerContainer);

	return container;
}

// function createEditButton(todo) {
// 	const button = document.createElement("button");
// 	button.type = "button";
// 	const icon = createElement(Pencil, {
// 		"stroke-width": 2.2,
// 	});
// 	button.appendChild(icon);

// 	button.addEventListener("click", e => {
// 		const footer = e.currentTarget.parentElement;
// 		const capsule = footer.parentElement;
// 		const ul = capsule.parentElement;

// 		todo.toggleEdit();
// 		localStorage.setItem("projectList", JSON.stringify(projectList));

// 		const currTodo = ul.querySelector(`#todo-${todo.id}`);
// 		const currHeader = currTodo.querySelector("div:first-of-type");

// 		const updatedHeader = createHeader(todo);

// 		if (currHeader) {
// 			capsule.replaceChild(updatedHeader, currHeader);
// 		}

// 		const currBody = currTodo.querySelector("div:nth-of-type(2)");

// 		if (currBody) {
// 			if (currBody.classList.contains(styles.open)) {
// 				currBody.classList.remove(styles.open);
// 			} else {
// 				currBody.classList.add(styles.open);
// 			}
// 		}
// 	});

// 	return button;
// }

function createFooter(todo) {
	const container = document.createElement("div");
	container.className = styles.footer;
	const editButton = createEditButton(todo);

	const doneButton = renderDoneButton(todo);

	container.append(doneButton, editButton);
	return container;
}

export default function createTodo(project, todo) {
	const header = todo.isEditActive
		? createInputHeader(todo)
		: createParagraphHeader(todo);

	const body = createBody(project, todo);

	if (todo.isEditActive) {
		body.classList.add(styles.open);
	}

	const footer = createFooter(todo);

	const accordion = createCapsuleAccordion({
		id: todo.id,
		headerEl: header,
		bodyEl: body,
		footerEl: footer,
	});

	return accordion;
}
