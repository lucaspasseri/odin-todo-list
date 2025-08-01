import * as styles from "../style/todoAccordion.module.css";
// import createEditButton from "./editButton";

export default function createCapsuleAccordion({
	id,
	headerEl,
	bodyEl,
	footerEl,
}) {
	const capsule = document.createElement("div");
	capsule.id = `todo-${id}`;
	capsule.className = styles.capsule;

	// headerEl.classList.add(styles.header);
	// bodyEl.classList.add(styles.body);
	// footerEl.classList.add(styles.footer);

	// const body = document.createElement("div");

	// body.classList.add(styles.body);

	// if (todo.isEditActive) {
	// 	body.classList.add(styles.open);
	// }

	// const footer = document.createElement("div");
	// footer.className = styles.footer;

	// const editButton = createEditButton(todo);
	// footer.appendChild(editButton);

	if (headerEl) {
		capsule.appendChild(headerEl);
	}

	if (bodyEl) {
		capsule.appendChild(bodyEl);
	}

	if (footerEl) {
		capsule.appendChild(footerEl);
	}

	return capsule;
}
