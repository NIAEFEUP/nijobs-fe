import { smoothScrollToRef } from ".";

describe("utils - smooth scroll to ref", () => {
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
