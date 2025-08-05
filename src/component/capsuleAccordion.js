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
