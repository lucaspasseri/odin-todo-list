import * as styles from "../styles/projectList.module.css";
import List from "../list";
import Todo from "../todo";
import renderTodo from "./todo";

function renderProjectList(listRef) {
	const projectList = document.querySelector("#projectList");
	projectList.innerHTML = "";
	projectList.className = styles.projectList;

	const ul = document.createElement("ul");

	listRef.list.forEach(project => {
		const li = document.createElement("li");
		li.textContent = project.id;

		project.list.forEach(todoRef => {
			li.appendChild(renderTodo(todoRef));
		});

		const addNewTodoButton = document.createElement("button");
		addNewTodoButton.addEventListener("click", () => {
			project.add(new Todo());
			renderProjectList(listRef);
		});

		const p = document.createElement("p");
		p.textContent = "+";

		addNewTodoButton.appendChild(p);

		li.appendChild(addNewTodoButton);

		ul.appendChild(li);
	});

	const addNewButton = document.createElement("button");
	addNewButton.addEventListener("click", () => {
		listRef.add(new List());
		renderProjectList(listRef);
	});

	const p = document.createElement("p");
	p.textContent = "+";

	addNewButton.appendChild(p);

	ul.appendChild(addNewButton);

	projectList.appendChild(ul);
}

export default function createProjectList() {
	const projectList = new List();
	const todoList = new List();
	const todo = new Todo();

	todoList.add(todo);
	projectList.add(todoList);

	renderProjectList(projectList);
}
