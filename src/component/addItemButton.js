import render from "./projectList";
import { createElement, Plus } from "lucide";
import * as styles from "../style/addItemButton.module.css";

export default function renderAddButton(list, item, styleVariant) {
	const addButton = document.createElement("button");
	addButton.classList.add(styles.button);
	if (styles[styleVariant]) {
		addButton.classList.add(styles[styleVariant]);
	}

	const iconSize = {
		projectList: 60,
		todoList: 30,
	};

	const icon = createElement(Plus, {
		"stroke-width": 2.8,
		width: iconSize[styleVariant],
		height: iconSize[styleVariant],
	});

	addButton.appendChild(icon);

	addButton.addEventListener("click", () => {
		list.add(item);
		render();
	});

	return addButton;
}
