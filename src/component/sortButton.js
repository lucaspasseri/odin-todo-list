import * as styles from "../style/sortButton.module.css";
import createSortPopover from "./sortPopover";
import { createElement, ArrowDownUp } from "lucide";

export default function createSortButton(project) {
	const button = document.createElement("button");
	const buttonId = `sortBtn-${project.id}`;
	button.id = buttonId;
	button.type = "button";

	const icon = createElement(ArrowDownUp, {
		"stroke-width": 2.8,
		width: 20,
		height: 20,
	});
	button.appendChild(icon);

	const popoverId = `sortPop-${project.id}`;
	button.setAttribute("popovertarget", popoverId);
	button.setAttribute("popovertargetaction", "toggle");
	button.className - styles.button;

	if (project.isSortActive) {
		button.classList.add(styles.active);
		icon.classList.add(styles.active);
	}

	const popover = createSortPopover(project, popoverId, buttonId);

	const container = document.createElement("div");
	container.className = styles.container;
	container.append(button, popover);

	return container;
}
