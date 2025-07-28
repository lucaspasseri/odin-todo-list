import * as styles from "../style/projectList.module.css";
import projectListRef from "../state";
import renderTodoList from "./todoList";
import List from "../class/list";

export default function render() {
	const projectListContainer = document.querySelector("#projectList");
	projectListContainer.innerHTML = "";
	projectListContainer.className = styles.projectList;

	const ul = document.createElement("ul");

	projectListRef.list.forEach(project => {
		ul.appendChild(renderTodoList(project));
	});

	const addNewButton = document.createElement("button");
	addNewButton.addEventListener("click", () => {
		projectListRef.add(new List());
		render();
	});
	const p = document.createElement("p");
	p.textContent = "+";
	addNewButton.appendChild(p);

	ul.appendChild(addNewButton);

	projectListContainer.appendChild(ul);
}
