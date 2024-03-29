/* eslint-disable react-hooks/rules-of-hooks */
import { MemoryRouter, useLocation } from "react-router-dom";
import qs from "qs";

import { testHookWithStoreAndTheme } from "../../../../test-utils";
import { act } from "react-dom/test-utils";
import useChipsFieldSearch from "./useChipsFieldSearch";
import { createTheme } from "@material-ui/core";

describe("useChipsFieldSearch", () => {
    const theme = createTheme({});

    it("should change fields's search param when adding fields", async () => {
        let addFieldWithUrl, location;
        const initialState = {
            offerSearch: {
                searchValue: "searchValue",
                jobDuration: [1, 2],
                fields: [],
                technologies: [],
            },
        };

        const callback = () => {
            addFieldWithUrl = useChipsFieldSearch().addFieldWithUrl;

            location = useLocation();
        };

        testHookWithStoreAndTheme(callback, initialState, theme, MemoryRouter);

        expect(location).toHaveProperty("search", "");

        await act(() => {
            addFieldWithUrl("TEST-FIELD");
        });

        let expectedLocationSearch = `?${qs.stringify({
            fields: ["TEST-FIELD"],
        }, { skipNulls: true, arrayFormat: "brackets" })}`;

        expect(location).toHaveProperty("search", expectedLocationSearch);

        // Wait for state update
        await new Promise((r) => setTimeout(r, 500));

        await act(() => {
            addFieldWithUrl("TEST-FIELD-2");
        });

        expectedLocationSearch = `?${qs.stringify({
            fields: ["TEST-FIELD", "TEST-FIELD-2"],
        }, { skipNulls: true, arrayFormat: "brackets" })}`;

        expect(location).toHaveProperty("search", expectedLocationSearch);
    });

    it("should change technologies's search param when adding fields", async () => {
        let addTechWithUrl, location;
        const initialState = {
            offerSearch: {
                searchValue: "searchValue",
                jobDuration: [1, 2],
                fields: [],
                technologies: [],
            },
        };

        const callback = () => {
            addTechWithUrl = useChipsFieldSearch().addTechWithUrl;

            location = useLocation();
        };

        testHookWithStoreAndTheme(callback, initialState, theme, MemoryRouter, { initialEntries: ["/"] });


        expect(location).toHaveProperty("search", "");

        await act(() => {
            addTechWithUrl("TEST-TECH");
        });

        let expectedLocationSearch = `?${qs.stringify({
            technologies: ["TEST-TECH"],
        }, { skipNulls: true, arrayFormat: "brackets" })}`;

        expect(location).toHaveProperty("search", expectedLocationSearch);

        // Wait for state update
        await new Promise((r) => setTimeout(r, 500));

        await act(() => {
            addTechWithUrl("TEST-TECH-2");
        });

        expectedLocationSearch = `?${qs.stringify({
            technologies: ["TEST-TECH", "TEST-TECH-2"],
        }, { skipNulls: true, arrayFormat: "brackets" })}`;

        expect(location).toHaveProperty("search", expectedLocationSearch);
    });

});
