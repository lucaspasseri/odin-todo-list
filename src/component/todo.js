import createCapsuleAccordion from "./capsuleAccordion";
import * as styles from "../style/todo.module.css";
import createDoneButton from "./doneButton";
import createUrgencyIndicator from "./urgencyIndicator";
import createDeleteButton from "./deleteButton";
import render from "./projectList";
import createRemainingTime from "./remainingTime";
import projectList from "../state";
import createEditButton from "./editTodoButton";
import { format } from "date-fns";

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
	p.textContent = todo.title.trim() || "(empty)";

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
	if (!todo.title.trim().length > 0) {
		input.setAttribute("placeholder", "(empty)");
	}

	input.addEventListener("change", e => {
		todo.title = e.target.value;
		localStorage.setItem("projectList", JSON.stringify(projectList));
	});

	const urgencyIndicator = createUrgencyIndicator(todo);
	container.append(input, urgencyIndicator);

	return container;
}

function createBody(project, todo) {
	const container = document.createElement("div");
	container.className = styles.body;

	const innerContainer = document.createElement("div");

	const descriptionText = document.createElement("textarea");
	descriptionText.setAttribute("type", "text");
	descriptionText.setAttribute("name", "description");
	descriptionText.value = todo.description;
	descriptionText.rows = "2";

	if (!todo.description.trim().length > 0) {
		descriptionText.placeholder = "(empty)";
	}

	descriptionText.addEventListener("change", e => {
		todo.description = e.target.value;
	});

	const deleteButton = createDeleteButton(project, todo.id);

	const deadlineDatePicker = document.createElement("input");
	deadlineDatePicker.id = `deadline-${todo.id}`;

	deadlineDatePicker.setAttribute("type", "datetime-local");

	if (todo.deadline instanceof Date) {
		deadlineDatePicker.setAttribute(
			"value",
			format(todo.deadline, "yyyy-MM-dd'T'HH:mm")
		);
	}

	deadlineDatePicker.addEventListener("change", e => {
		const value = e.currentTarget.value;

		todo.deadline =
			typeof value === "string" && value.length > 0 ? new Date(value) : null;
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
		descriptionText,
		labelDeadline,
		labelRemaining,
		deleteButton
	);

	container.appendChild(innerContainer);

	return container;
}

function createFooter(todo) {
	const container = document.createElement("div");
	container.className = styles.footer;
	const editButton = createEditButton(todo);

	const doneButton = createDoneButton(todo);

	container.append(editButton, doneButton);
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
