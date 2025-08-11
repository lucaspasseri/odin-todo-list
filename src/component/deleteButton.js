import render from "./projectList";
import { createElement, Trash } from "lucide";
import * as styles from "../style/deleteButton.module.css";
import projectList from "../state";

export default function createDeleteButton(list, targetId) {
	const deleteButton = document.createElement("button");
	deleteButton.className = styles.button;

	const icon = createElement(Trash, {
		"stroke-width": 2.5,
		width: 20,
		height: 20,
	});

	deleteButton.appendChild(icon);

	deleteButton.addEventListener("click", () => {
		list.deleteItemById(targetId);
		localStorage.setItem("projectList", JSON.stringify(projectList));
		render();
	});

	return deleteButton;
}
