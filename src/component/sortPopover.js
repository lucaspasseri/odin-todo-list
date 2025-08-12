import createComparator from "../util/createComparator";
import * as styles from "../style/sortPopover.module.css";

const sortTypes = [
	{
		type: "title",
		compareFn: createComparator(
			todo => todo.title,
			(a, b) => a.localeCompare(b)
		),
	},
	{
		type: "deadline",
		compareFn: createComparator(
			todo => todo.deadline,
			(a, b) => {
				return a - b;
			}
		),
	},
];

export default function createSortPopover(project, popoverTargetId, anchorId) {
	const popover = document.createElement("div");
	popover.setAttribute("popover", "auto");
	popover.className = styles.popover;
	popover.id = popoverTargetId;
	popover.setAttribute("anchor", anchorId);

	const contentContainer = document.createElement("div");
	contentContainer.className = styles.contentContainer;

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
