export default function createComparator(
	getValue,
	compareFn,
	undefinedLast = true
) {
	return function (a, b) {
		const valA = getValue(a);
		const valB = getValue(b);

		const aUndef = valA === undefined || valA === null;
		const bUndef = valB === undefined || valB === null;

		if (aUndef && bUndef) return 0;
		if (aUndef) return undefinedLast ? 1 : -1;
		if (bUndef) return undefinedLast ? -1 : 1;

		return compareFn(valA, valB);
	};
}
