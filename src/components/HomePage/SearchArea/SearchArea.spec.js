import React from "react";
import { SearchArea, mapDispatchToProps, mapStateToProps } from "./SearchArea";
import { addSnackbar } from "../../../actions/notificationActions";
import { setSearchValue, setJobDuration, setJobType } from "../../../actions/searchOffersActions";
import SearchBar from "./SearchBar";
import ShowAdvancedOptionsButton from "./ShowAdvancedOptionsButton";

import {
    FormControl,
    Paper,
    TextField,
    Collapse,
} from "@material-ui/core";
import { mockDateNow, mockRandomMath } from "../../../../testUtils";

describe("SearchArea", () => {
    let onSubmit;
    beforeEach(() => {
        onSubmit = jest.fn();
    });

    describe("render", () => {
        it("should render a paper", () => {
            expect(shallow(<SearchArea onSubmit={onSubmit} />).find(Paper).exists()).toBe(true);
        });

        it("should render a form", () => {
            expect(shallow(<SearchArea onSubmit={onSubmit} />).find("form").first().prop("id")).toEqual("search_form");
        });

        it("should render a SearchBar", () => {

            const searchBar = shallow(<SearchArea onSubmit={onSubmit} />).find(SearchBar).first();
            expect(searchBar.exists()).toBe(true);
        });

        it("should render a Collapse", () => {
            expect(shallow(<SearchArea onSubmit={onSubmit} />).find(Collapse).first().prop("in")).toBe(false);
        });

        it("should render a ShowAdvancedOptionsButton", () => {
            const searchArea = shallow(<SearchArea onSubmit={onSubmit} />);
            const button = searchArea.find(ShowAdvancedOptionsButton).first();
            expect(button.prop("isOpen")).toBe(false);
        });

        it("should contain a TextField with 'job_type' id", () => {
            expect(shallow(<SearchArea onSubmit={onSubmit} />).find(TextField).first().prop("id")).toEqual("job_type");
        });

        it("should contain a FormControl", () => {
            expect(
                shallow(<SearchArea onSubmit={onSubmit} />)
                    .find(FormControl).exists()
            ).toBe(true);
        });
    });

    describe("interaction", () => {
        it("should call onSubmit callback on form submit", () => {
            const addSnackbar = () => {};
            const searchOffersMock = jest.fn();
            const form = shallow(
                <SearchArea
                    onSubmit={onSubmit}
                    addSnackbar={addSnackbar}
                    searchOffers={searchOffersMock}
                />
            ).find("form#search_form").first();

            form.simulate("submit", {
                preventDefault: () => {},
            });
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(searchOffersMock).toHaveBeenCalledTimes(1);
        });

        it("should toggle advanced options when clicking ShowAdvancedOptionsButton", () => {
            const searchArea = shallow(<SearchArea onSubmit={onSubmit}/>);
            const button = searchArea.find(ShowAdvancedOptionsButton).first();

            expect(searchArea.find(Collapse).first().prop("in")).toBe(false);
            button.simulate("click");
            expect(searchArea.find(Collapse).first().prop("in")).toBe(true);

        });

        it("should toggle advanced options when clicking ShowAdvancedOptionsButton", () => {
            const searchArea = shallow(<SearchArea onSubmit={onSubmit}/>);
            const button = searchArea.find(ShowAdvancedOptionsButton).first();

            expect(searchArea.find(Collapse).first().prop("in")).toBe(false);
            button.simulate("click");
            expect(searchArea.find(Collapse).first().prop("in")).toBe(true);

        });
    });

    describe("redux", () => {
        it("should mapStateToProps", () => {
            const mockState = {
                offerSearch: {
                    searchValue: "searchValue",
                    jobType: "jobType",
                    jobDuration: "jobDuration",
                },
            };
            expect(mapStateToProps(mockState)).toEqual({
                searchValue: "searchValue",
                jobType: "jobType",
                jobDuration: "jobDuration",
            });
        });

        it("should mapDispatchToProps", () => {

            const RANDOM_VALUE = 0.5;
            const DATE_NOW = 1;

            const originalMathObj = mockRandomMath(RANDOM_VALUE);
            const originalDateNowFn = mockDateNow(DATE_NOW);

            const dispatch = jest.fn();
            const props = mapDispatchToProps(dispatch);
            props.addSnackbar({ message: "message" });
            expect(dispatch).toHaveBeenCalledWith(addSnackbar({
                message: "message",
            }));

            global.Math = originalMathObj;
            Date.now = originalDateNowFn;

            props.setSearchValue("searchValue");
            expect(dispatch).toHaveBeenCalledWith(setSearchValue("searchValue"));

            props.setJobDuration(null, 2);
            expect(dispatch).toHaveBeenCalledWith(setJobDuration(2));

            const jobType = {
                target: {
                    value: "jobType",
                },
            };

            props.setJobType(jobType);
            expect(dispatch).toHaveBeenCalledWith(setJobType("jobType"));
        });
    });
});
