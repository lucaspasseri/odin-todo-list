import * as styles from "../styles/projectList.module.css";
import List from "../list";
import Todo from "../todo";
import renderTodo from "./todo";

export default function createProjectList() {
	const projectList = new List();
	const todoList = new List();
	const todo = new Todo();

	todoList.add(todo);
	projectList.add(todoList);

	renderProjectList(projectList);
}

function renderProjectList(projectList) {
	const projectListContainer = document.querySelector("#projectList");
	projectListContainer.innerHTML = "";
	projectListContainer.className = styles.projectList;

	const ul = document.createElement("ul");

	projectList.list.forEach(project => {
		ul.appendChild(renderTodoList(project, projectList, renderProjectList));
	});

	const addNewButton = document.createElement("button");
	addNewButton.addEventListener("click", () => {
		projectList.add(new List());
		renderProjectList(projectList);
	});
	const p = document.createElement("p");
	p.textContent = "+";
	addNewButton.appendChild(p);

	ul.appendChild(addNewButton);

	projectListContainer.appendChild(ul);
}

function renderTodoList(project, projectList, renderProjectList) {
	const todoList = document.createElement("li");
	todoList.className = styles.todoList;

	const h3 = document.createElement("h3");
	h3.textContent = project.id;

	const closeButton = document.createElement("button");

	const closeP = document.createElement("p");
	closeP.textContent = "X";
	closeButton.appendChild(closeP);

	closeButton.addEventListener("click", () => {
		console.log({ projectList, project });

		projectList.deleteItemById(project.id);
		renderProjectList(projectList);
	});

	const ul = document.createElement("ul");

	project.list.forEach(todo => {
		ul.appendChild(renderTodo(todo, project, projectList, renderProjectList));
	});

	const addNewTodoButton = document.createElement("button");

	addNewTodoButton.addEventListener("click", () => {
		project.add(new Todo());
		renderProjectList(projectList);
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
