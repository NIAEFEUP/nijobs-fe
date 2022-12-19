/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { MemoryRouter, useLocation } from "react-router-dom";
import qs from "qs";

import { renderWithStoreAndTheme, TestComponent } from "../../../../test-utils";
import { act } from "react-dom/test-utils";
import { useChipsFieldSearch } from "./useChipsFieldSearch";
import { createTheme } from "@material-ui/core";
import { applyMiddleware, createStore } from "redux";
import searchOffersReducer from "../../../../reducers/searchOffersReducer";
import thunk from "redux-thunk";
import { useSelector } from "react-redux";

describe("useUrlSearchParams", () => {
    const theme = createTheme({});

    it("should change fields's search param when adding fields", async () => {
        let addFieldWithUrl, location;
        const initialState = {
            searchValue: "searchValue",
            jobDuration: [1, 2],
            fields: [],
            technologies: [],
        };

        const store = createStore(searchOffersReducer, initialState, applyMiddleware(...[thunk]),);

        const callback = () => {
            addFieldWithUrl = useChipsFieldSearch().addFieldWithUrl;

            location = useLocation();
        };


        renderWithStoreAndTheme(
            <MemoryRouter initialEntries={["/"]}>
                <TestComponent callback={callback} />
            </MemoryRouter>,
            { store, theme }
        );


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
            searchValue: "searchValue",
            jobDuration: [1, 2],
            fields: [],
            technologies: [],
        };

        const store = createStore(searchOffersReducer, initialState, applyMiddleware(...[thunk]),);

        const callback = () => {
            addTechWithUrl = useChipsFieldSearch().addTechWithUrl;

            location = useLocation();
        };


        renderWithStoreAndTheme(
            <MemoryRouter initialEntries={["/"]}>
                <TestComponent callback={callback} />
            </MemoryRouter>,
            { store, theme }
        );


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
