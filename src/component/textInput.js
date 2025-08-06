// import * as styles from "../style/doneButton.module.css";

export default function renderTextInput(todo, propName) {
	const container = document.createElement("div");
	// container.className = styles.textInputContainer;

	if (!todo.isEditActive) {
		const p = document.createElement("p");
		p.textContent = todo[propName];
		container.appendChild(p);

		return container;
	}

	const input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("value", todo[propName]);

	input.addEventListener("change", e => {
		const v = e.target.value;
		todo[propName] = v;
	});

	container.appendChild(input);

	return container;
}
