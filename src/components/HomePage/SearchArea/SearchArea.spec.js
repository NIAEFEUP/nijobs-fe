import React from "react";
import { SearchArea, mapDispatchToProps, mapStateToProps } from "./SearchArea";
import {
    setSearchValue,
    setJobDuration,
    setJobType,
    setFields,
    setTechs,
    setShowJobDurationSlider,
} from "../../../actions/searchOffersActions";
import { createTheme } from "@material-ui/core";
import { renderWithStoreAndTheme, screen, fireEvent, act } from "../../../test-utils";

import { MemoryRouter } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RouteWrappedContent = ({ children }) => (
    <MemoryRouter initialEntries={["/"]}>
        {children}
    </MemoryRouter>
);

describe("SearchArea", () => {
    let onSubmit;
    const theme = createTheme();
    const initialState = {};
    beforeEach(() => {
        onSubmit = jest.fn();
    });

    describe("render", () => {
        it("should render a Paper, a Form, a Search Bar, a Search Button and Advanced Options Button", () => {
            renderWithStoreAndTheme(
                <RouteWrappedContent>
                    <SearchArea onSubmit={onSubmit} fields={[]} technologies={[]} />
                </RouteWrappedContent>,
                { initialState, theme }
            );

            expect(screen.getByTestId("search-area-paper")).toBeInTheDocument();
            expect(screen.getByTestId("search_form")).toBeInTheDocument();
            expect(screen.getByRole("textbox", { name: "Search" })).toBeInTheDocument();
            expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
            expect(screen.getByRole("button", { name: "Toggle Advanced Search" })).toBeInTheDocument();
        });
    });

    describe("interaction", () => {
        it("should call onSubmit callback on search button click", async () => {
            const searchValue = "test";
            const setSearchValue = () => { };

            const onSubmit = jest.fn();
            const addSnackbar = () => { };

            // Simulate request success
            fetch.mockResponse(JSON.stringify({ mockData: true }));

            renderWithStoreAndTheme(
                <RouteWrappedContent>
                    <SearchArea
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        addSnackbar={addSnackbar}
                        onSubmit={onSubmit}
                        fields={[]}
                        technologies={[]}
                    />
                </RouteWrappedContent>,
                { initialState, theme }
            );

            const searchButton = screen.getByRole("button", { name: "Search" });

            await act(async () => {
                await fireEvent.click(searchButton);
            });

            expect(onSubmit).toHaveBeenCalledTimes(1);
        });

    });

    describe("redux", () => {
        it("should mapStateToProps", () => {
            const mockState = {
                offerSearch: {
                    searchValue: "searchValue",
                    jobType: "jobType",
                    jobDuration: [1, 2],
                    fields: ["field1", "field2"],
                    technologies: ["tech1", "tech2"],
                },
            };
            expect(mapStateToProps(mockState)).toEqual({
                searchValue: "searchValue",
                jobType: "jobType",
                jobMinDuration: 1,
                jobMaxDuration: 2,
                fields: ["field1", "field2"],
                technologies: ["tech1", "tech2"],
            });
        });

        it("should mapDispatchToProps", () => {
            const dispatch = jest.fn();
            const props = mapDispatchToProps(dispatch);

            props.setSearchValue("searchValue");
            expect(dispatch).toHaveBeenCalledWith(setSearchValue("searchValue"));

            props.setJobDuration(null, [1, 2]);
            expect(dispatch).toHaveBeenCalledWith(setJobDuration(1, 2));

            props.setJobType("jobType");
            expect(dispatch).toHaveBeenCalledWith(setJobType("jobType"));

            const fields = ["field1", "field2"];
            props.setFields(fields);
            expect(dispatch).toHaveBeenCalledWith(setFields(["field1", "field2"]));

            const technologies = ["tech1", "tech2"];
            props.setTechs(technologies);
            expect(dispatch).toHaveBeenCalledWith(setTechs(["tech1", "tech2"]));

            const filterJobDuration = false;
            props.setShowJobDurationSlider(filterJobDuration);
            expect(dispatch).toHaveBeenCalledWith(setShowJobDurationSlider(false));
        });
    });
});
