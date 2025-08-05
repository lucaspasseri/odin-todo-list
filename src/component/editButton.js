import render from "./projectList";
import { createElement, Pencil } from "lucide";
import * as styles from "../style/editButton.module.css";
import * as styles2 from "../style/todoAccordion.module.css";
import projectListRef from "../state";

export default function createEditButton(todo) {
	const editButton = document.createElement("button");
	editButton.className = styles.button;

	const icon = createElement(Pencil, {
		"stroke-width": 2.5,
	});

	editButton.appendChild(icon);

	editButton.addEventListener("mousedown", () => {
		todo.toggleEdit();
		const body = document.querySelector(`#body-${todo.id}`);

		if (todo.isEditActive) {
			body.classList.add(styles2.open);
			return;
		}

		body.classList.remove(styles2.open);
	});

	return editButton;
}
