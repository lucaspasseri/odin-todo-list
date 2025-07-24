import * as styles from "../style/projectList.module.css";
import projectList from "../state";
import renderTodoList from "./todoList";
import List from "../class/list";

export default function render() {
	const projectListContainer = document.querySelector("#projectList");
	projectListContainer.innerHTML = "";
	projectListContainer.className = styles.projectList;

	const ul = document.createElement("ul");

	projectList.list.forEach(project => {
		ul.appendChild(renderTodoList(project));
	});

	const addNewButton = document.createElement("button");
	addNewButton.addEventListener("click", () => {
		projectList.add(new List());
		render();
	});
	const p = document.createElement("p");
	p.textContent = "+";
	addNewButton.appendChild(p);

	ul.appendChild(addNewButton);

	projectListContainer.appendChild(ul);
}
