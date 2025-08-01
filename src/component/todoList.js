import * as styles from "../style/todoList.module.css";
import projectListRef from "../state";
import Todo from "../class/todo";
import renderCloseButton from "./closeButton";
import renderAddButton from "./addItemButton";
import createTodo from "./todo";

export default function renderTodoList(project) {
	const todoList = document.createElement("li");
	todoList.className = styles.todoList;

	const h3 = document.createElement("h3");
	h3.textContent = project.id;

	const closeButton = renderCloseButton(projectListRef, project.id);

	const ul = document.createElement("ul");

	project.list.forEach(todo => {
		// ul.appendChild(createTodo(todo));
		ul.appendChild(createTodo(project, todo));
	});

	const addItemButton = renderAddButton(project, "todoList");

	ul.appendChild(addItemButton);

	const ulContainer = document.createElement("div");
	ulContainer.appendChild(ul);

	todoList.append(h3, closeButton, ulContainer);

	return todoList;
}
