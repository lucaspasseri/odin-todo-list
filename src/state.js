import List from "./class/list";
import Todo from "./class/todo";

const projectList = new List();
const todoList = new List();
const todo = new Todo();

todoList.add(todo);
projectList.add(todoList);

export default projectList;
