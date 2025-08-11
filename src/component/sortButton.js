import * as styles from "../style/sortButton.module.css";
import createSortPopover from "./sortPopover";
import { createElement, ArrowDownUp } from "lucide";

export default function createSortButton(project) {
	const button = document.createElement("button");
	const buttonId = `sortBtn-${project.id}`;
	button.id = buttonId;
	button.type = "button";

	const icon = createElement(ArrowDownUp, {
		"stroke-width": 3,
		width: 20,
		height: 20,
	});
	button.appendChild(icon);

	const popoverTargetId = `sortPop-${project.id}`;
	button.setAttribute("popovertarget", popoverTargetId);
	button.setAttribute("popovertargetaction", "toggle");

	const popover = createSortPopover(project, popoverTargetId, buttonId);

	const container = document.createElement("div");
	container.className = styles.container;
	container.append(button, popover);
	return container;
}
