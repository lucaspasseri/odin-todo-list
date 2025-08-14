import { createElement, Pencil } from "lucide";
import projectList from "../state";
import { createHeader } from "./todoList";
import * as styles from "../style/editListButton.module.css";

export default function createEditButton(project) {
	const button = document.createElement("button");
	button.type = "button";

	if (project.isEditActive) {
		button.classList.add(styles.active);
	}

	button.addEventListener("click", () => {
		project.toggleEdit();
		localStorage.setItem("projectList", JSON.stringify(projectList));

		const currProject = document.querySelector(`li#proj-${project.id}`);
		const currHeader = currProject.querySelector("div");
		const updatedHeader = createHeader(project, projectList);

		if (currHeader) {
			currProject.replaceChild(updatedHeader, currHeader);
		}
	});

	const icon = createElement(Pencil, {
		"stroke-width": 2.8,
		width: 20,
		height: 20,
	});

	button.appendChild(icon);

	return button;
}
