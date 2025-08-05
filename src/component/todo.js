import { createElement, Pencil } from "lucide";
import createCapsuleAccordion from "./capsuleAccordion";
import * as styles from "../style/newTodo.module.css";
import renderDoneButton from "./doneButton";
import createPriorityIndicator from "./priorityIndicator";
import renderCloseButton from "./closeButton";
import render from "./projectList";

function createHeader(todo) {
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

	container.appendChild(p);

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

	container.appendChild(input);

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

	const doneButton = renderDoneButton(todo);

	const priorityIndicator = createPriorityIndicator(todo.priority);
	console.log({ u: todo.urgency });
	const urgencyIndicator = createPriorityIndicator(todo.urgency);

	const deleteButton = renderCloseButton(project, todo.id);

	const startDatePicker = document.createElement("input");

	startDatePicker.setAttribute("type", "datetime-local");
	startDatePicker.setAttribute("value", todo.startDate);

	startDatePicker.addEventListener("change", e => {
		const value = e.currentTarget.value;
		todo.startDate = value;
		console.log({ value });
		render();
	});

	const deadlineDatePicker = document.createElement("input");

	deadlineDatePicker.setAttribute("type", "datetime-local");
	deadlineDatePicker.setAttribute("value", todo.deadline);

	deadlineDatePicker.addEventListener("change", e => {
		const value = e.currentTarget.value;
		todo.deadline = value;
		console.log({ value });
		render();
	});

	innerContainer.append(
		descriptionInput,
		doneButton,
		priorityIndicator,
		urgencyIndicator,
		deleteButton,
		startDatePicker,
		deadlineDatePicker
	);

	container.appendChild(innerContainer);

	return container;
}

function createEditButton(todo) {
	const button = document.createElement("button");
	button.type = "button";
	const icon = createElement(Pencil, {
		"stroke-width": 2.2,
	});
	button.appendChild(icon);

	button.addEventListener("click", e => {
		const footer = e.currentTarget.parentElement;
		const capsule = footer.parentElement;
		const ul = capsule.parentElement;

		todo.toggleEdit();

		const currTodo = ul.querySelector(`#todo-${todo.id}`);
		const currHeader = currTodo.querySelector("div:first-of-type");

		const updatedHeader = createHeader(todo);

		if (currHeader) {
			capsule.replaceChild(updatedHeader, currHeader);
		}

		const currBody = currTodo.querySelector("div:nth-of-type(2)");

		if (currBody) {
			if (currBody.classList.contains(styles.open)) {
				currBody.classList.remove(styles.open);
			} else {
				currBody.classList.add(styles.open);
			}
		}
	});

	return button;
}

function createFooter(todo) {
	const container = document.createElement("div");
	container.className = styles.footer;
	const editButton = createEditButton(todo);
	container.appendChild(editButton);
	return container;
}

export default function createTodo(project, todo) {
	console.log({ todo });

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
