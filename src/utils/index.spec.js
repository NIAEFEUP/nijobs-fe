import { smoothScrollToRef, capitalize } from ".";

describe("utils", () => {
    describe("smooth scroll to ref", () => {
        it("should smooth scroll to ref", () => {
            const scrollIntoViewMock = jest.fn();
            const ref = {
                current: {
                    scrollIntoView: scrollIntoViewMock,
                },
            };

            smoothScrollToRef(ref);
            expect(scrollIntoViewMock).toHaveBeenCalledWith({
                behavior: "smooth",
                block: "start",
            });
        });

        it("should not scroll if ref is not set", () => {
            const scrollIntoViewMock = jest.fn();
            const ref = {};

            smoothScrollToRef(ref);
            expect(scrollIntoViewMock).toHaveBeenCalledTimes(0);
        });
    });

    describe("capitalize", () => {
        it("should capitalize string", () => {
            expect(capitalize("string")).toBe("String");
            expect(capitalize("STRING")).toBe("STRING");
            expect(capitalize("s")).toBe("S");
        });
        it("should throw error if trying to capitalize non-string", () => {
            expect(() => capitalize([1])).toThrowError("Trying to capitalize non string object:");
        });
    });
});
