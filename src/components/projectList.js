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

function renderProjectList(projectListRef) {
	const projectList = document.querySelector("#projectList");
	projectList.innerHTML = "";
	projectList.className = styles.projectList;

	const ul = document.createElement("ul");

	projectListRef.list.forEach(project => {
		ul.appendChild(renderTodoList(project, projectListRef));
	});

	const addNewButton = document.createElement("button");
	addNewButton.addEventListener("click", () => {
		projectListRef.add(new List());
		renderProjectList(projectListRef);
	});
	const p = document.createElement("p");
	p.textContent = "+";
	addNewButton.appendChild(p);

	ul.appendChild(addNewButton);

	projectList.appendChild(ul);
}

function renderTodoList(project, projectListRef) {
	const todoList = document.createElement("li");
	todoList.className = styles.todoList;

	const h3 = document.createElement("h3");
	h3.textContent = project.id;

	const ul = document.createElement("ul");

	project.list.forEach(todoRef => {
		ul.appendChild(renderTodo(todoRef));
	});

	const addNewTodoButton = document.createElement("button");

	addNewTodoButton.addEventListener("click", () => {
		project.add(new Todo());
		renderProjectList(projectListRef);
	});

	const p = document.createElement("p");
	p.textContent = "+";

	addNewTodoButton.appendChild(p);

	ul.appendChild(addNewTodoButton);

	const ulContainer = document.createElement("div");
	ulContainer.appendChild(ul);

	todoList.append(h3, ulContainer);

	return todoList;
}
