import { parseFiltersToDimensions, parseSearchUrl, DIMENSION_IDS } from "./analytics";

describe("analytics", () => {
    describe("parse search filters to dimensions", () => {
        const jobTypeId = DIMENSION_IDS.jobType;
        const jobMinDurationId = DIMENSION_IDS.jobMinDuration;
        const technologiesId = DIMENSION_IDS.technologies;

        it("should include tracked search filters", () => {
            const filters = {
                jobType: "FULL-TIME",
                jobMinDuration: 10,
                technologies: ["React", "Vue"],
            };
            const searchDimensions = parseFiltersToDimensions(filters);

            expect(searchDimensions).toHaveProperty(jobTypeId);
            expect(searchDimensions[jobTypeId]).toBe(filters.jobType);
            expect(searchDimensions).toHaveProperty(jobMinDurationId);
            expect(searchDimensions[jobMinDurationId]).toBe(filters.jobMinDuration);

            expect(searchDimensions).toHaveProperty(technologiesId);
            expect(searchDimensions[technologiesId]).toBe("React,Vue");
        });

        it("should not include untracked search filters", () => {
            const filters = {
                jobType: "FULL-TIME",
                test: "Test",
            };
            const searchDimensions = parseFiltersToDimensions(filters);

            expect(searchDimensions).toHaveProperty(jobTypeId);
            expect(searchDimensions[jobTypeId]).toBe(filters.jobType);
            expect(Object.keys(searchDimensions).length).toBe(1);
        });

        it("should not include falsy values", () => {
            const filters = {
                jobType: "FULL-TIME",
                technologies: false,
            };
            const searchDimensions = parseFiltersToDimensions(filters);

            expect(searchDimensions).toHaveProperty(jobTypeId);
            expect(searchDimensions[jobTypeId]).toBe(filters.jobType);
            expect(Object.keys(searchDimensions).length).toBe(1);
            expect(searchDimensions).not.toHaveProperty(technologiesId);
        });

        it("should not include values with empty arrays", () => {
            const filters = {
                jobType: "FULL-TIME",
                technologies: [],
            };
            const searchDimensions = parseFiltersToDimensions(filters);

            expect(searchDimensions).toHaveProperty(jobTypeId);
            expect(searchDimensions[jobTypeId]).toBe(filters.jobType);
            expect(Object.keys(searchDimensions).length).toBe(1);
            expect(searchDimensions).not.toHaveProperty(technologiesId);
        });
    });

    describe("parse search URL", () => {
        it("should mantain query when value is included", () => {
            const queryUrl = "/test?value=test";
            const parsedUrl = parseSearchUrl(queryUrl);
            expect(parsedUrl).toEqual(queryUrl);
        });

        it("should append empty value when it's not in the query", () => {
            const queryUrl = "/test?jobType=FULL-TIME";
            const parsedUrl = parseSearchUrl(queryUrl);
            expect(parsedUrl).toBe(`${queryUrl}&value=[EMPTY]`);
        });

        it("should append empty value when there is no query", () => {
            const rawUrl = "/test";
            const parsedUrl = parseSearchUrl(rawUrl);
            expect(parsedUrl).toBe(`${rawUrl}?value=[EMPTY]`);
        });

        it("should append empty value when query is empty", () => {
            const queryUrl = "/test?";
            const parsedUrl = parseSearchUrl(queryUrl);
            expect(parsedUrl).toBe(`${queryUrl}value=[EMPTY]`);
        });
    });
});
