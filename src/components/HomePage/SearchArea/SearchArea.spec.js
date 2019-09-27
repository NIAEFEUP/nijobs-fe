import React from "react";
import { SearchArea, mapDispatchToProps, mapStateToProps } from "./SearchArea";
import { addSnackbar } from "../../../actions/notificationActions";
import SearchBar from "./SearchBar";
import ShowAdvancedOptionsButton from "./ShowAdvancedOptionsButton";
import searchAreaStyle from "./SearchArea.module.css";

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
            expect(searchBar.hasClass(searchAreaStyle.searchBar)).toBe(true);
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

        it("should contain a FormControl with correct style", () => {
            expect(
                shallow(<SearchArea onSubmit={onSubmit} />)
                    .find(FormControl).first().hasClass(searchAreaStyle.durationSlider)
            ).toBe(true);
        });
    });

    describe("interaction", () => {
        it("should call onSubmit callback on form submit", () => {
            const addSnackbar = () => {};
            const form = shallow(
                <SearchArea
                    onSubmit={onSubmit}
                    addSnackbar={addSnackbar}
                />
            ).find("form#search_form").first();

            form.simulate("submit", {
                preventDefault: () => {},
            });
            expect(onSubmit).toHaveBeenCalledTimes(1);
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
            expect(mapStateToProps()).toEqual({});
        });

        it("should mapActionsToProps", () => {

            const RANDOM_VALUE = 0.5;
            const DATE_NOW = 1;

            const originalMathObj = mockRandomMath(RANDOM_VALUE);
            const originalDateNowFn = mockDateNow(DATE_NOW);
            // asserts that the addSnackbar in props is mapped to addSnackbar from notification actions

            const dispatch = jest.fn();
            const props = mapDispatchToProps(dispatch);
            props.addSnackbar({ message: "message" });
            expect(dispatch).toHaveBeenCalledWith(addSnackbar({
                message: "message",
                key: DATE_NOW + RANDOM_VALUE,
            }));

            global.Math = originalMathObj;
            Date.now = originalDateNowFn;
        });
    });
});
