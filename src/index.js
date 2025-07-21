import "./global.css";
import hello, { renderHello } from "./greeting";
import TodoList from "./todoList";

renderHello();
console.log(hello);

const newList = new TodoList();
console.log({ newList });
