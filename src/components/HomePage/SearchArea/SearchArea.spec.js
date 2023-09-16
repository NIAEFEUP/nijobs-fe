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

import PropTypes from "prop-types";

import qs from "qs";
import { INITIAL_JOB_TYPE } from "../../../reducers/searchOffersReducer";

// eslint-disable-next-line react/prop-types
const RouteWrappedContent = ({ children, url = "/" }) => (
    <MemoryRouter initialEntries={[url]}>
        {children}
    </MemoryRouter>
);

const SearchAreaWrapper = ({
    searchValue = "", jobType = INITIAL_JOB_TYPE, jobDuration = [null, null], filterJobDuration = false,
    showJobDurationSlider = false, fields = [], technologies = [], setShowJobDurationSlider = () => { },
    setTechs = () => { }, setJobDuration = () => { }, setFields = () => { }, setJobType = () => { },
    setSearchValue = () => { }, onSubmit = () => {},
}) => (
    <SearchArea
        searchValue={searchValue}
        jobType={jobType}
        jobDuration={jobDuration}
        filterJobDuration={filterJobDuration}
        fields={fields}
        technologies={technologies}
        showJobDurationSlider={showJobDurationSlider}
        setShowJobDurationSlider={setShowJobDurationSlider}
        setTechs={setTechs}
        setJobDuration={setJobDuration}
        setFields={setFields}
        setJobType={setJobType}
        setSearchValue={setSearchValue}
        onSubmit={onSubmit}
    />
);

SearchAreaWrapper.propTypes = {
    onSubmit: PropTypes.func,
    searchValue: PropTypes.string.isRequired,
    jobType: PropTypes.string,
    setSearchValue: PropTypes.func.isRequired,
    setJobDuration: PropTypes.func.isRequired,
    setJobType: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
    technologies: PropTypes.array.isRequired,
    showJobDurationSlider: PropTypes.bool.isRequired,
    setFields: PropTypes.func.isRequired,
    setTechs: PropTypes.func.isRequired,
    setShowJobDurationSlider: PropTypes.func.isRequired,
    jobDuration: PropTypes.number,
    filterJobDuration: PropTypes.bool,
};

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
                    <SearchAreaWrapper
                        onSubmit={onSubmit}
                    />
                </RouteWrappedContent>,
                { initialState, theme }
            );

            expect(screen.getByTestId("search-area-paper")).toBeInTheDocument();
            expect(screen.getByTestId("search_form")).toBeInTheDocument();
            expect(screen.getByRole("textbox", { name: "Search" })).toBeInTheDocument();
            expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
            expect(screen.getByRole("button", { name: "Toggle Advanced Search" })).toBeInTheDocument();
        });
        it("should render a text='Show All' in the default state of searchArea", () => {
            const searchArea = renderWithStoreAndTheme(
                <RouteWrappedContent>
                    <SearchAreaWrapper />
                </RouteWrappedContent>,
                { initialState, theme }
            );

            expect(searchArea.getByRole("button", { name: "Search" })).toHaveTextContent("Show All");
        });
        it("should render a text='Search' when search bar value != ''", () => {
            const searchArea = renderWithStoreAndTheme(
                <RouteWrappedContent>
                    <SearchAreaWrapper
                        searchValue={"somevalue"}
                    />
                </RouteWrappedContent>,
                { initialState, theme }
            );

            expect(searchArea.getByRole("button", { name: "Search" })).toHaveTextContent("Search");
        });
        it("should render a text='Show All' when search bar has undefined value", () => {
            const searchArea = renderWithStoreAndTheme(
                <RouteWrappedContent>
                    <SearchAreaWrapper
                        searchValue={undefined}
                    />
                </RouteWrappedContent>,
                { initialState, theme }
            );

            expect(searchArea.getByRole("button", { name: "Search" })).toHaveTextContent("Show All");
        });
        it("should render a text='Search' when fields != []", () => {
            const searchArea = renderWithStoreAndTheme(
                <RouteWrappedContent>
                    <SearchAreaWrapper
                        fields={["field1", "field2"]}
                    />
                </RouteWrappedContent>,
                { initialState, theme }
            );

            expect(searchArea.getByRole("button", { name: "Search" })).toHaveTextContent("Search");
        });
        it("should render a text='Search' when technologies != []", () => {
            const searchArea = renderWithStoreAndTheme(
                <RouteWrappedContent>
                    <SearchAreaWrapper
                        technologies={["tech1", "tech2"]}
                    />
                </RouteWrappedContent>,
                { initialState, theme }
            );

            expect(searchArea.getByRole("button", { name: "Search" })).toHaveTextContent("Search");
        });
        it("should render a text='Search' when jobType != INITIAL_JOB_TYPE", () => {
            const searchArea = renderWithStoreAndTheme(
                <RouteWrappedContent>
                    <SearchAreaWrapper
                        jobType={"JOB"}
                    />
                </RouteWrappedContent>,
                { initialState, theme }
            );

            expect(searchArea.getByRole("button", { name: "Search" })).toHaveTextContent("Search");
        });
        it("should render a text='Search' when showJobDurationSlider = true ", () => {
            const searchArea = renderWithStoreAndTheme(
                <RouteWrappedContent>
                    <SearchAreaWrapper
                        showJobDurationSlider={true}
                    />
                </RouteWrappedContent>,
                { initialState, theme }
            );

            expect(searchArea.getByRole("button", { name: "Search" })).toHaveTextContent("Search");
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
                        showJobDurationSlider={() => { }}
                        setShowJobDurationSlider={() => { }}
                        setTechs={() => { }}
                        setJobDuration={() => { }}
                        setFields={() => { }}
                        setJobType={() => { }}
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

        it("should call onSubmit callback on search button click", () => {
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
                        loadUrlFromFilters={true}
                        showJobDurationSlider={() => { }}
                        setShowJobDurationSlider={() => { }}
                        setTechs={() => { }}
                        setJobDuration={() => { }}
                        setFields={() => { }}
                        setJobType={() => { }}
                        onSubmit={onSubmit}
                        fields={[]}
                        technologies={[]}
                        setLoadUrlFromFilters={() => { }}
                    />
                </RouteWrappedContent>,
                { initialState, theme }
            );

            expect(onSubmit).toHaveBeenCalledTimes(1);
        });

        it("should fill in search filters if they are present in the URL", () => {

            const urlParams = {
                searchValue: "test-search-value",
                jobMinDuration: 2,
                jobMaxDuration: 9,
                fields: ["TEST-FIELD1", "TEST-FIELD2"],
                technologies: ["TEST-TECH"],
                jobType: "test-job-type",
            };

            const urlSearchQuery = qs.stringify(urlParams, {
                skipNulls: true,
                arrayFormat: "brackets",
            });
            const url = `/?${urlSearchQuery}`;

            const onSubmit = jest.fn();
            const setFields = jest.fn();
            const setTechs = jest.fn();
            const setJobType = jest.fn();
            const setJobDuration = jest.fn();
            const setShowJobDurationSlider = jest.fn();
            const setSearchValue = jest.fn();

            renderWithStoreAndTheme(
                <RouteWrappedContent url={url}>
                    <SearchAreaWrapper
                        onSubmit={onSubmit}
                        setSearchValue={setSearchValue}
                        setJobType={setJobType}
                        setJobDuration={setJobDuration}
                        setShowJobDurationSlider={setShowJobDurationSlider}
                        setFields={setFields}
                        setTechs={setTechs}
                    />
                </RouteWrappedContent>,
                { initialState, theme }
            );

            expect(setJobType).toHaveBeenCalledWith("test-job-type");
            expect(setShowJobDurationSlider).toHaveBeenCalledWith(true);
            expect(setJobDuration).toHaveBeenCalledWith(null, [2, 9]);
            expect(setTechs).toHaveBeenCalledWith(["TEST-TECH"]);
            expect(setFields).toHaveBeenCalledWith(["TEST-FIELD1", "TEST-FIELD2"]);
            expect(setSearchValue).toHaveBeenCalledWith("test-search-value");
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

            dispatch.mockClear();
            props.resetAdvancedSearchFields();
            expect(dispatch).toHaveBeenCalled();
        });
    });
});
