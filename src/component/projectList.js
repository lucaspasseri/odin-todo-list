import * as styles from "../style/projectList.module.css";
import projectListRef from "../state";
import createTodoList from "./todoList";
import createAddButton from "./addItemButton";

export default function render() {
	const projectListContainer = document.querySelector("#projectList");
	projectListContainer.innerHTML = "";
	projectListContainer.className = styles.projectList;

	const ul = document.createElement("ul");

	projectListRef.list.forEach(project => {
		ul.appendChild(createTodoList(project));
	});

	const addItemButton = createAddButton(projectListRef, "projectList");
	ul.appendChild(addItemButton);

	projectListContainer.appendChild(ul);
}
