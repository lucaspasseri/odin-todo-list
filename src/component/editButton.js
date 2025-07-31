import render from "./projectList";
import { createElement, Pencil } from "lucide";
import * as styles from "../style/editButton.module.css";

export default function createEditButton(todo) {
	const editButton = document.createElement("button");
	editButton.className = styles.button;

	const icon = createElement(Pencil, {
		"stroke-width": 2.5,
	});

	editButton.appendChild(icon);

	editButton.addEventListener("click", () => {
		console.log(1, todo.isEditActive);
		todo.toggleEdit();
		console.log(2, todo.isEditActive);
		render();
	});

	return editButton;
}

// const icon = createElement(Menu, {
// 	class: ["my-custom-class", "icon"],
// 	"stroke-width": 3,
// 	stroke: "red",
// 	width: 80,
// 	height: 80,
// });
