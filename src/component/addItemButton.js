import { createElement, Plus } from "lucide";
import * as styles from "../style/addItemButton.module.css";
import renderTodoList from "./todoList";
import createTodo from "./todo";
import Todo from "../class/todo";
import List from "../class/list";
import projectListRef from "../state";

export default function renderAddButton(list, styleVariant) {
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
		let newItem;
		let newItemComponent;
		if (styleVariant === "todoList") {
			newItem = new Todo();
			newItemComponent = createTodo(list, newItem);
		} else {
			newItem = new List();
			newItemComponent = renderTodoList(newItem);
		}

		list.add(newItem);

		addButton.before(newItemComponent);
		console.log({ projectListRef });
	});

	return addButton;
}
