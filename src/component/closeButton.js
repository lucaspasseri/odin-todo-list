import render from "./projectList";
import { createElement, Trash } from "lucide";
import * as styles from "../style/closeButton.module.css";

export default function renderCloseButton(list, targetId, variant = "top") {
	const closeButton = document.createElement("button");
	closeButton.className = styles.button;

	if (variant === "bottom") {
		closeButton.classList.add(styles.bottom);
	}

	const icon = createElement(Trash, {
		"stroke-width": 2.5,
		width: 20,
		height: 20,
	});

	closeButton.appendChild(icon);

	closeButton.addEventListener("click", () => {
		list.deleteItemById(targetId);
		render();
	});

	return closeButton;
}
