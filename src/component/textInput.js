// import * as styles from "../style/doneButton.module.css";

export default function renderTextInput(text, active = false) {
	const container = document.createElement("div");
	// container.className = styles.textInputContainer;

	if (!active) {
		const p = document.createElement("p");
		p.textContent = text;
		container.appendChild(p);

		return container;
	}

	const input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("placeholder", text);

	container.appendChild(input);

	return container;
}
