import { createElement, Pencil } from "lucide";
import createCapsuleAccordion from "./capsuleAccordion";
import * as styles from "../style/newTodo.module.css";
import renderDoneButton from "./doneButton";
import createPriorityIndicator from "./priorityIndicator";
import renderCloseButton from "./closeButton";

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

	const descriptionInput = document.createElement("input");
	descriptionInput.setAttribute("type", "text");
	descriptionInput.setAttribute("name", "description");
	descriptionInput.setAttribute("value", todo.description);

	descriptionInput.addEventListener("change", e => {
		todo.description = e.target.value;
	});

	const doneButton = renderDoneButton(todo);

	const priorityIndicator = createPriorityIndicator(todo.priority);

	const deleteButton = renderCloseButton(project, todo.id);

	console.log({ deleteButton });

	container.append(
		descriptionInput,
		doneButton,
		priorityIndicator,
		deleteButton
	);

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
		console.log({ e });
		// console.log({ list });
		const footer = e.currentTarget.parentElement;
		const capsule = footer.parentElement;
		const ul = capsule.parentElement;

		console.log({ footer, capsule, ul });

		todo.toggleEdit();

		const currTodo = ul.querySelector(`#todo-${todo.id}`);
		const currHeader = currTodo.querySelector("div:first-of-type");

		const updatedHeader = createHeader(todo);

		console.log({ currHeader, updatedHeader });

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
	console.log({ project, todo });

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
