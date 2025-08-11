import storageAvailable from "./util/storageAvailable";

import List from "./class/list";
import Todo from "./class/todo";

let projectList;

if (storageAvailable("localStorage")) {
	console.log(1);
	if (!localStorage.getItem("projectList")) {
		// if localStorage.getItem() === null
		console.log(3);
		projectList = new List();
		const todoList = new List();
		const todo = new Todo();

		todoList.add(todo);
		projectList.add(todoList);
		localStorage.setItem("projectList", JSON.stringify(projectList));
	} else {
		console.log(4);
		const rawProjectList = JSON.parse(localStorage.getItem("projectList"));
		projectList = List.fromJSON(rawProjectList);
	}
} else {
	console.log(2);
	projectList = new List();
	const todoList = new List();
	const todo = new Todo();

	todoList.add(todo);
	projectList.add(todoList);
}

console.log({ projectList });

export default projectList;
