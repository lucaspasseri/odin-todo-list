import { createElement, Pencil } from "lucide";
import * as styles from "../style/editButton.module.css";
import * as stylesTodo from "../style/todo.module.css";
import projectList from "../state";
import { createHeader } from "./todo";

export default function createEditButton(todo) {
	const button = document.createElement("button");
	button.className = styles.button;
	button.type = "button";

	const icon = createElement(Pencil, {
		"stroke-width": 2.2,
	});
	button.appendChild(icon);

	button.addEventListener("click", () => {
		todo.toggleEdit();
		localStorage.setItem("projectList", JSON.stringify(projectList));

		const currTodo = document.querySelector(`#todo-${todo.id}`);
		const currHeader = currTodo.querySelector("div:first-of-type");

		const updatedHeader = createHeader(todo);

		if (currHeader) {
			currTodo.replaceChild(updatedHeader, currHeader);
		}

		const currBody = currTodo.querySelector("div:nth-of-type(2)");

		if (currBody) {
			if (currBody.classList.contains(stylesTodo.open)) {
				currBody.classList.remove(stylesTodo.open);
			} else {
				currBody.classList.add(stylesTodo.open);
			}
		}
	});

	return button;
}
