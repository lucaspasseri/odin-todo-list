import render from "./projectList";
import { createElement, XSquare } from "lucide";
import * as styles from "../style/closeButton.module.css";

export default function renderCloseButton(list, targetId) {
	const closeButton = document.createElement("button");
	closeButton.className = styles.button;

	const icon = createElement(XSquare, {
		"stroke-width": 2.5,
	});

	closeButton.appendChild(icon);

	closeButton.addEventListener("click", () => {
		list.deleteItemById(targetId);
		render();
	});

	return closeButton;
}

// const icon = createElement(Menu, {
// 	class: ["my-custom-class", "icon"],
// 	"stroke-width": 3,
// 	stroke: "red",
// 	width: 80,
// 	height: 80,
// });
