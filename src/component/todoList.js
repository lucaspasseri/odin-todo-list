import * as styles from "../style/todoList.module.css";
import projectListRef from "../state";
import createDeleteButton from "./deleteButton";
import renderAddButton from "./addItemButton";
import createTodo from "./todo";
import createSortButton from "./sortButton";

export default function renderTodoList(project) {
	const todoList = document.createElement("li");
	todoList.className = styles.todoList;

	const h3 = document.createElement("h3");
	h3.textContent = project.id;

	const sortButton = createSortButton(project);

	const deleteButton = createDeleteButton(projectListRef, project.id);

	const buttonsContainer = document.createElement("div");
	buttonsContainer.append(sortButton, deleteButton);

	const header = document.createElement("div");
	header.className = styles.header;
	header.append(h3, buttonsContainer);

	const ul = document.createElement("ul");

	project.list.forEach(todo => {
		ul.appendChild(createTodo(project, todo));
	});

	const addItemButton = renderAddButton(project, "todoList");

	ul.appendChild(addItemButton);

	const ulContainer = document.createElement("div");
	ulContainer.className = styles.ulContainer;
	ulContainer.appendChild(ul);

	todoList.append(header, ulContainer);

	return todoList;
}
