import { MemoryRouter, useLocation } from "react-router-dom";
import qs from "qs";

import useUrlSearchParams from "./useUrlSearchParams";

import { testHook } from "../../../test-utils";
import { act } from "react-dom/test-utils";

const capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
    first === undefined ? "" : first.toLocaleUpperCase(locale) + rest.join("");

describe("useUrlSearchParams", () => {

    it("should change Location's search param to include custom data", async () => {
        let changeUrlFilters, location;
        const queryParams = {};

        testHook(() => {
            changeUrlFilters = useUrlSearchParams().changeURLFilters;

            location = useLocation();
        }, MemoryRouter);

        expect(location).toHaveProperty("search", "");

        const changes = {
            testParam: "testValue",
        };

        await act(() => {
            changeUrlFilters(location, queryParams, changes);
        });

        const expectedLocationSearch = `?${qs.stringify(changes, { skipNulls: true, arrayFormat: "brackets" })}`;

        expect(location).toHaveProperty("search", expectedLocationSearch);
    });

    it.each([
        ["jobDuration", [1, 2], [1, 2]],
        ["jobType", { target: { value: "test-job-type" } }, "test-job-type"],
        ["searchValue", "test-search-value", "test-search-value"],
        ["fields", ["TEST-FIELD-1", "TEST-FIELD-2"], ["TEST-FIELD-1", "TEST-FIELD-2"]],
        ["techs", ["TEST-TECH-1", "TEST-TECH-2"], ["TEST-TECH-1", "TEST-TECH-2"]],
    ])("should populate the Location's search property with %s", async (fieldName, fieldValue, expectedValue) => {

        let location, searchParamsResult;

        const functionName = `set${capitalizeFirstLetter(fieldName)}`;
        const testFunction = jest.fn();

        testHook(() => {
            searchParamsResult = useUrlSearchParams({
                [functionName]: testFunction,
            });

            location = useLocation();
        }, MemoryRouter);

        const hookedInTestFunction = searchParamsResult[functionName];

        // using fail(...) is not recommended as Jasmine globals will be removed from Jest
        if (!hookedInTestFunction) throw Error(`No hooked-in test function found for ${functionName}`);

        expect(location).toHaveProperty("search", "");

        await act(() => {
            if (fieldName === "jobDuration")
                hookedInTestFunction(null, fieldValue);
            else
                hookedInTestFunction(fieldValue);
        });

        expect(testFunction).toHaveBeenCalled();

        let params = {
            [fieldName]: expectedValue,
        };

        if (fieldName === "jobDuration") {
            const [minDuration, maxDuration] = expectedValue;

            params = {
                "jobMinDuration": minDuration,
                "jobMaxDuration": maxDuration,
            };
        } else if (fieldName === "techs")
            params = {
                "technologies": expectedValue,
            };

        const expectedLocationSearch = `?${qs.stringify(params, { skipNulls: true, arrayFormat: "brackets" })}`;

        expect(location).toHaveProperty("search", expectedLocationSearch);
    });

    it("should clear the Location's search property", async () => {
        let location, searchParamsResult;

        const testFunction = jest.fn();

        const params = {
            searchValue: "test-search-value",
            jobMinDuration: 2,
            jobMaxDuration: 9,
            fields: ["TEST-FIELD1", "TEST-FIELD2"],
            technologies: ["TEST-TECH"],
            jobType: "test-job-type",
        };

        const initialLocationSearch = `?${qs.stringify(params, { skipNulls: true, arrayFormat: "brackets" })}`;

        testHook(() => {
            searchParamsResult = useUrlSearchParams({
                resetAdvancedSearchFields: testFunction,
            });

            location = useLocation();
        }, MemoryRouter, { initialEntries: [`/${initialLocationSearch}`] });

        expect(location).toHaveProperty("search", initialLocationSearch);

        const { resetAdvancedSearchFields } = searchParamsResult;

        await act(() => {
            resetAdvancedSearchFields();
        });

        expect(testFunction).toHaveBeenCalled();

        expect(location).toHaveProperty("search", "");
    });

    it("should remove job duration information if slider is hidden by user", async () => {
        let location, searchParamsResult;

        const testFunction = jest.fn();

        const params = {
            searchValue: "test-search-value",
            jobMinDuration: 2,
            jobMaxDuration: 9,
            fields: ["TEST-FIELD1", "TEST-FIELD2"],
            technologies: ["TEST-TECH"],
            jobType: "test-job-type",
        };

        const initialLocationSearch = `?${qs.stringify(params, { skipNulls: true, arrayFormat: "brackets" })}`;

        testHook(() => {
            searchParamsResult = useUrlSearchParams({
                setShowJobDurationSlider: testFunction,
            });

            location = useLocation();
        }, MemoryRouter, { initialEntries: [`/${initialLocationSearch}`] });

        expect(location).toHaveProperty("search", initialLocationSearch);

        const { setShowJobDurationSlider } = searchParamsResult;

        await act(() => {
            setShowJobDurationSlider(false);
        });

        expect(testFunction).toHaveBeenCalled();

        delete params.jobMinDuration;
        delete params.jobMaxDuration;

        const finalLocationSearch = `?${qs.stringify(params, { skipNulls: true, arrayFormat: "brackets" })}`;

        expect(location).toHaveProperty("search", finalLocationSearch);
    });
});
