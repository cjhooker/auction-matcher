import "../array-extensions";
import { expect } from "chai";

describe("Array.max extension method calculates the max", () => {
    it("array", () => {
        const array = [1, 2, 7, 3, 4];
        let max = array.max();
        expect(max).to.equal(7);
    });

    it("empty array", () => {
        const array: number[] = [];
        let max = array.max();
        expect(max).to.equal(-Infinity);
    });

    it("2D matrix", () => {
        const matrix = [
            [7.1, 2, 100],
            [4, 100, 6],
            [1.2, 3.4, 5.6]
        ];
        let max = matrix.max();
        expect(max).to.equal(100);
    });

    it("2D matrix with an empty row", () => {
        const matrix = [
            [-1, -2, -3],
            [],
            [-4, -5, -6]
        ];
        let max = matrix.max();
        expect(max).to.equal(-1);
    });

    it("2D matrix when max is last number", () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        let max = matrix.max();
        expect(max).to.equal(6);
    });

    it("2D matrix when max is first number", () => {
        const matrix = [
            [7.1, 2, 3],
            [4, 5, 6],
            [1.2, 3.4, 5.6]
        ];
        let max = matrix.max();
        expect(max).to.equal(7.1);
    });

    it("3D matrix", () => {
        const matrix = [
            [
                [7.1, 2, 100],
                [4, 100, 6],
                [1.2, 3.4, 5.6]
            ],
            [
                [7.1, 2, 100],
                [4, 100, 245],
                [1.2, 3.4, 5.6]
            ]
        ];
        let max = matrix.max();
        expect(max).to.equal(245);
    });
});