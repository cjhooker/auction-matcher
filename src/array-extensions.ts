/**
 * Extend Array to get the max element from an array or matrix of numbers.
 * The matrix may have any number of dimensions.
 */
Array.prototype.max = function () {
    if (this.length == 0) {
        return -Infinity;
    }

    if (Array.isArray(this[0])) {
        return this.reduce(matrixReducer, -Infinity);
    } else {
        return this.reduce(arrayReducer, -Infinity);
    }
}

const arrayReducer = (arrayMax: number, num: number) => Math.max(arrayMax, num);
const matrixReducer = (matrixMax: number, array: number[]) => Math.max(matrixMax, array.max());
