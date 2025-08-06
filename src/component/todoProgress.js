export default function todoProgress(todo) {
	const container = document.createElement("div");
	const progressBar = document.createElement("progress");

	const todoProgress = todo.calcTodoProgress();

	// console.log({ todoProgress });

	progressBar.setAttribute("max", todoProgress.maxValue);
	progressBar.setAttribute("value", todoProgress.currValue);

	container.appendChild(progressBar);
	return container;
}
