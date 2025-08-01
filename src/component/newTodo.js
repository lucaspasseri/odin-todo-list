import createCapsuleAccordion from "./capsuleAccordion";
import * as styles from "../style/newTodo.module.css";

function createHeader(todo) {
	if (todo.isEditActive) {
		return createInputHeader(todo.title);
	}

	return createParagraphHeader(todo.title);
}

function createParagraphHeader(title) {
	const container = document.createElement("div");
	container.className = styles.header;
	const p = document.createElement("p");
	p.textContent = title;

	container.appendChild(p);

	return container;
}

function createInputHeader(title) {
	const container = document.createElement("div");
	container.className = styles.header;
	const input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("value", title);

	input.addEventListener("change", e => {
		const v = e.target.value;
		console.log({ v });
		// todo[propName] = v;
	});

	container.appendChild(input);

	return container;
}

function createBody() {
	const container = document.createElement("div");
	container.className = styles.body;
	return container;
}

function createNewEditButton(todo) {
	const button = document.createElement("button");
	button.type = "button";
	button.textContent = "Edit";

	button.addEventListener("click", e => {
		console.log({ e });
		// console.log({ list });
		const footer = e.target.parentElement;
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
	const editButton = createNewEditButton(todo);
	container.appendChild(editButton);
	return container;
}

export default function createTodo(todo) {
	const header = todo.isEditActive
		? createInputHeader(todo.title)
		: createParagraphHeader(todo.title);

	const body = createBody();

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
