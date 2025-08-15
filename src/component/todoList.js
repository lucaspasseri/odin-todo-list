import * as styles from "../style/todoList.module.css";
import projectListRef from "../state";
import createDeleteButton from "./deleteButton";
import createAddButton from "./addItemButton";
import createTodo from "./todo";
import createSortButton from "./sortButton";
import createEditButton from "./editListButton";

export function createHeader(project, projectListRef) {
	const header = document.createElement("div");
	header.className = styles.header;

	if (project.isEditActive) {
		const inputTitle = document.createElement("input");
		inputTitle.type = "text";
		inputTitle.value = project.title;

		if (!project.title.trim().length > 0) {
			inputTitle.placeholder = "(empty)";
		}

		inputTitle.addEventListener("change", e => {
			const value = e.target.value;
			console.log({ value });
			project.title = value;
			localStorage.setItem("projectList", JSON.stringify(projectListRef));
		});

		header.appendChild(inputTitle);
	} else {
		const title = document.createElement("h3");
		title.textContent = project.title.trim() || "(empty)";
		header.appendChild(title);
	}

	const editButton = createEditButton(project);

	const sortButton = createSortButton(project);

	const deleteButton = createDeleteButton(projectListRef, project.id);

	const buttonsContainer = document.createElement("div");
	buttonsContainer.appendChild(editButton);

	if (project.isEditActive) {
		buttonsContainer.appendChild(deleteButton);
	} else {
		buttonsContainer.append(sortButton);
	}

	header.append(buttonsContainer);

	return header;
}

export default function createTodoList(project) {
	const header = createHeader(project, projectListRef);

	const ul = document.createElement("ul");

	project.list.forEach(todo => {
		ul.appendChild(createTodo(project, todo));
	});

	const addItemButton = createAddButton(project, "todoList");

	ul.appendChild(addItemButton);

	const ulContainer = document.createElement("div");
	ulContainer.className = styles.ulContainer;
	ulContainer.appendChild(ul);

	const todoList = document.createElement("li");
	todoList.id = `proj-${project.id}`;
	todoList.className = styles.todoList;

	todoList.append(header, ulContainer);

	return todoList;
}
