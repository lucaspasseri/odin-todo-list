import render from "./projectList";
// import { createElement, Plus } from "lucide";
import * as styles from "../style/doneButton.module.css";

export default function renderDoneButton(todo) {
	const container = document.createElement("div");
	container.className = styles.doneButtonContainer;

	console.log({ todo });
	const label = document.createElement("label");
	label.id = `label-${todo.id}`;
	const checkbox = document.createElement("input");
	checkbox.id = `onOff-${todo.id}`;
	checkbox.checked = todo.done;
	checkbox.setAttribute("type", "checkbox");
	label.setAttribute("for", `onOff-${todo.id}`);

	label.addEventListener("click", () => {
		todo.toggleDone();
		render();
	});

	container.append(checkbox, label);

	return container;
}
