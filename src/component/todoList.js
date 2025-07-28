import * as styles from "../style/todoList.module.css";
import projectListRef from "../state";
import render from "./projectList";
import renderTodo from "./todo";
import Todo from "../class/todo";
import renderCloseButton from "./closeButton";
import renderAddButton from "./addItemButton";

export default function renderTodoList(project) {
	const todoList = document.createElement("li");
	todoList.className = styles.todoList;

	const h3 = document.createElement("h3");
	h3.textContent = project.id;

	const closeButton = renderCloseButton(projectListRef, project.id);

	const ul = document.createElement("ul");

	project.list.forEach(todo => {
		ul.appendChild(renderTodo(todo, project));
	});

	const addItemButton = renderAddButton(project, new Todo(), "todoList");

	ul.appendChild(addItemButton);

	const ulContainer = document.createElement("div");
	ulContainer.appendChild(ul);

	todoList.append(h3, closeButton, ulContainer);

	return todoList;
}
