import * as styles from "../style/todoList.module.css";
import projectListRef from "../state";
import render from "./projectList";
import renderTodo from "./todo";
import Todo from "../class/todo";
import renderCloseButton from "./closeButton";

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

	const addNewTodoButton = document.createElement("button");

	addNewTodoButton.addEventListener("click", () => {
		project.add(new Todo());
		render();
	});

	const p = document.createElement("p");
	p.textContent = "+";

	addNewTodoButton.appendChild(p);

	ul.appendChild(addNewTodoButton);

	const ulContainer = document.createElement("div");
	ulContainer.appendChild(ul);

	todoList.append(h3, closeButton, ulContainer);

	return todoList;
}
