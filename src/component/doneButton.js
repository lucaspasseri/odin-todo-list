import * as styles from "../style/doneButton.module.css";

export default function createDoneButton(todo) {
	const container = document.createElement("div");
	container.className = styles.doneButtonContainer;

	const button = document.createElement("button");
	button.setAttribute("type", "button");
	button.setAttribute("aria-label", "Mark todo as done");
	button.setAttribute("aria-pressed", todo.done.toString());

	button.addEventListener("click", () => {
		todo.toggleDone();
		button.setAttribute("aria-pressed", todo.done.toString());
	});

	container.append(button);

	return container;
}
