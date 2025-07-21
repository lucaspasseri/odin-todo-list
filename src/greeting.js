import * as styles from "./greeting.module.css";

const hello = "Hello World!";

export function renderHello() {
	const body = document.querySelector("body");
	const header = document.createElement("h1");
	header.textContent = hello;
	header.className = styles.header;

	body.appendChild(header);
}

export default hello;
