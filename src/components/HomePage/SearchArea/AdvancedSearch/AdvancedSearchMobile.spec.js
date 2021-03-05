import React from "react";
import AdvancedSearchMobile from "./AdvancedSearchMobile";
import {
    Collapse,
    TextField,
    MenuItem,
    FormControlLabel,
    Switch,
    Slider,
    FormHelperText,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
} from "@material-ui/core";
import JobTypes from "../JobTypes";
import MultiOptionAutocomplete from "./MultiOptionAutocomplete/MultiOptionAutocomplete";
import SearchBar from "../SearchBar";

describe("AdvancedSearchDesktop", () => {
    describe("render", () => {
        it("should render a Dialog", () => {
            const openWrapper = shallow(<AdvancedSearchMobile open />);
            expect(openWrapper.find(Dialog).first().prop("open")).toBe(true);

            const closedWrapper = shallow(<AdvancedSearchMobile open={false} />);
            expect(closedWrapper.find(Dialog).first().prop("open")).toBe(false);
        });

        it("should render a dialog title with a button to close", () => {

        });

        it("should render a SearchBar", () => {
            const wrapper = shallow(<AdvancedSearchMobile open />);
            expect(wrapper.find(SearchBar).exists()).toBe(true);
        });

        it("should render a job selector with all job types", () => {
            const wrapper = shallow(<AdvancedSearchMobile open />);
            expect(wrapper.find(TextField).contains(JobTypes.map(({ value, label }) => (
                <MenuItem
                    key={value}
                    value={value}
                >
                    {label}
                </MenuItem>
            ))));
        });

        it("should contain a job duration toggle", () => {
            const wrapper = shallow(<AdvancedSearchMobile open JobDurationSwitchLabel="test" />);
            expect(wrapper.find(FormControlLabel).prop("control")).toEqual(<Switch />);
            expect(wrapper.find(FormControlLabel).prop("label")).toEqual("test");
        });

        it("should contain a collapse to show the job duration slider", () => {

            const MultiOptionAutocompleteProps = {
                multiple: true,
                renderInput: () => {},
                options: [],
                id: "fields-selector",
                onChange: () => {},
                value: [1, 2],
            };
            const autocompleteProps = {
                getRootProps: () => {},
                getInputProps: () => {},
                getInputLabelProps: () => {},
                getClearProps: () => {},
                getPopupIndicatorProps: () => {},
                getTagProps: () => {},
                getListboxProps: () => {},
                getOptionProps: () => {},
                value: [1, 2],
            };

            const SelectorProps = {
                ...MultiOptionAutocompleteProps,
                autocompleteProps: autocompleteProps,
            };


            const wrapper = mount(
                <AdvancedSearchMobile
                    open
                    JobDurationCollapseProps={{ in: true }}
                    FieldsSelectorProps={SelectorProps}
                    TechsSelectorProps={SelectorProps}
                    JobDurationSliderText="test"
                />
            );

            expect(wrapper.find(Collapse).first().prop("in")).toBe(true);
            expect(wrapper.find(Collapse).first().find(Slider).exists()).toBe(true);
            expect(wrapper.find(Collapse).first().find(FormHelperText).prop("children")).toEqual("test");
        });

        it("should contain a multiautocomplete for fields", () => {
            const wrapper = shallow(
                <AdvancedSearchMobile open />
            );

            expect(wrapper.find({ _id: "fields_selector" }).find(MultiOptionAutocomplete).exists()).toBe(true);
        });

        it("should contain a multiautocomplete for techs", () => {
            const wrapper = shallow(
                <AdvancedSearchMobile open />
            );

            expect(wrapper.find({ _id: "techs_selector" }).find(MultiOptionAutocomplete).exists()).toBe(true);
        });

        it("should contain a button for resetting the fields", () => {
            const resetFn = () => {};
            const wrapper = shallow(
                <AdvancedSearchMobile
                    open
                    resetAdvancedSearch={resetFn}
                />
            );

            expect(wrapper.find({ _id: "reset_btn" }).find(Button).exists()).toBe(true);
        });

    });

    describe("interaction", () => {
        it("should close the advanced search when the close button is clicked", () => {
            const setSearchValue = () => {};
            const close = jest.fn();

            const wrapper = shallow(
                <AdvancedSearchMobile
                    open
                    setSearchValue={setSearchValue}
                    close={close}
                />
            );

            wrapper.find(DialogTitle).first().find(IconButton).simulate("click");
            expect(close).toHaveBeenCalledTimes(1);
        });

        it("should close the advanced search when the search button is clicked or on SearchBar enter", () => {
            const setSearchValue = () => {};
            const close = jest.fn();
            const submitForm = jest.fn();

            const AutocompleteProps = {
                renderInput: () => {},
            };

            const autocompleteProps = {
                getRootProps: () => {},
                getInputProps: () => {},
                getInputLabelProps: () => {},
                getPopupIndicatorProps: () => {},
                getClearProps: () => {},
                getTagProps: () => {},
                getListboxProps: () => {},
                getOptionProps: () => {},
                value: [],
                dirty: false,
                id: "",
                popupOpen: false,
                focused: false,
                focusedTag: false,
                anchorEl: null,
                setAnchorEl: () => {},
                inputValue: "asd",
                groupedOptions: [],
            };

            const SelectorProps = {
                ...AutocompleteProps,
                autocompleteProps,
            };

            const wrapper = mount(
                <AdvancedSearchMobile
                    open
                    setSearchValue={setSearchValue}
                    close={close}
                    submitForm={submitForm}
                    FieldsSelectorProps={SelectorProps}
                    TechsSelectorProps={SelectorProps}
                />
            );

            wrapper.find({ _id: "search_btn" }).find(Button).simulate("click", { preventDefault: () => {} });
            wrapper.find(Dialog).prop("onExited")(); // Simulating the dialog exit
            wrapper.find(SearchBar).first().find("input").simulate("keypress", { key: "Enter" });
            wrapper.find(Dialog).prop("onExited")(); // Simulating the dialog exit
            expect(close).toHaveBeenCalledTimes(2);
            expect(submitForm).toHaveBeenCalledTimes(2);

        });

        it("should call resetAdvancedSearch when Reset button is clicked", () => {
            const resetFn = jest.fn();
            const setSearchValue = () => {};
            const wrapper = shallow(
                <AdvancedSearchMobile
                    open
                    setSearchValue={setSearchValue}
                    resetAdvancedSearch={resetFn}
                />
            );

            wrapper.find({ _id: "reset_btn" }).find(Button).simulate("click", { preventDefault: () => {} });
            expect(resetFn).toHaveBeenCalledTimes(1);

        });

        it("should close but not submit form when back arrow button is clicked", () => {
            const submitForm = jest.fn();
            const close = jest.fn();

            const setSearchValue = () => {};
            const wrapper = shallow(
                <AdvancedSearchMobile
                    open
                    close={close}
                    setSearchValue={setSearchValue}
                    submitForm={submitForm}
                />
            );

            wrapper.find(DialogTitle).find(IconButton).simulate("click", { preventDefault: () => {} });
            wrapper.find(Dialog).prop("onExited")(); // Simulating the dialog exit

            expect(submitForm).toHaveBeenCalledTimes(0);
            expect(close).toHaveBeenCalledTimes(1);
        });
    });
});
