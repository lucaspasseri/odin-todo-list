import createComparator from "../util/createComparator";
import * as styles from "../style/sortPopover.module.css";
import * as sortBtnStyles from "../style/sortButton.module.css";
import { createElement, X } from "lucide";

const sortTypes = [
	{
		type: "Title",
		compareFn: createComparator(
			todo => todo.title,
			(a, b) => a.localeCompare(b)
		),
	},
	{
		type: "Deadline",
		compareFn: createComparator(
			todo => todo.deadline,
			(a, b) => {
				return a - b;
			}
		),
	},
];

export default function createSortPopover(project, popoverId, anchorId) {
	const popover = document.createElement("div");
	popover.id = popoverId;
	popover.className = styles.popover;

	popover.setAttribute("anchor", anchorId);
	popover.setAttribute("popover", "auto");
	popover.addEventListener("beforetoggle", e => {
		const button = document.getElementById(anchorId);
		if (e.newState === "open") {
			button.classList.add(sortBtnStyles.active);
		} else {
			button.classList.remove(sortBtnStyles.active);
		}
	});

	const contentContainer = document.createElement("div");
	contentContainer.className = styles.contentContainer;
	const headerDiv = document.createElement("div");
	const h5 = document.createElement("h5");
	h5.textContent = "Sort by";

	const icon = createElement(X, {
		"stroke-width": 3,
		width: 14,
		height: 14,
	});

	const closeButton = document.createElement("button");
	closeButton.type = "button";
	closeButton.appendChild(icon);
	closeButton.addEventListener("click", () => {
		popover.hidePopover();
	});

	headerDiv.append(h5, closeButton);
	contentContainer.appendChild(headerDiv);

	const ul = document.createElement("ul");

	sortTypes.forEach(obj => {
		const li = document.createElement("li");
		const button = document.createElement("button");
		button.type = "button";
		button.textContent = obj.type;

		button.addEventListener("click", () => {
			project.sortBy(obj.compareFn);
		});
		li.appendChild(button);
		ul.appendChild(li);
	});

	contentContainer.appendChild(ul);
	popover.appendChild(contentContainer);

	return popover;
}
