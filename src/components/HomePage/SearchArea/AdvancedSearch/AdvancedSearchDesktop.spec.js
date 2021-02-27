import React from "react";
import AdvancedSearchDesktop from "./AdvancedSearchDesktop";
import { Collapse, TextField, MenuItem, FormControlLabel, Switch, Slider, FormHelperText, Button } from "@material-ui/core";
import JobTypes from "../JobTypes";
import MultiOptionAutocomplete from "./MultiOptionAutocomplete/MultiOptionAutocomplete";

describe("AdvancedSearchDesktop", () => {
    describe("render", () => {
        it("should render a collapse", () => {
            const openWrapper = shallow(<AdvancedSearchDesktop open />);
            expect(openWrapper.find(Collapse).first().prop("in")).toBe(true);

            const closedWrapper = shallow(<AdvancedSearchDesktop open={false} />);
            expect(closedWrapper.find(Collapse).first().prop("in")).toBe(false);
        });

        it("should render a job selector with all job types", () => {
            const wrapper = shallow(<AdvancedSearchDesktop open />);
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
            const wrapper = shallow(<AdvancedSearchDesktop open JobDurationSwitchLabel="test" />);
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
                <AdvancedSearchDesktop
                    open
                    JobDurationCollapseProps={{ in: true }}
                    FieldsSelectorProps={SelectorProps}
                    TechsSelectorProps={SelectorProps}
                    JobDurationSliderText="test"
                />
            );

            expect(wrapper.find(Collapse).at(1).prop("in")).toBe(true);
            expect(wrapper.find(Collapse).at(1).find(Slider).exists()).toBe(true);
            expect(wrapper.find(Collapse).at(1).find(FormHelperText).prop("children")).toEqual("test");
        });

        it("should contain a multiautocomplete for fields", () => {
            const wrapper = shallow(
                <AdvancedSearchDesktop open />
            );

            expect(wrapper.find({ _id: "fields_selector" }).find(MultiOptionAutocomplete).exists()).toBe(true);
        });

        it("should contain a multiautocomplete for technologies", () => {
            const wrapper = shallow(
                <AdvancedSearchDesktop open />
            );

            expect(wrapper.find({ _id: "techs_selector" }).find(MultiOptionAutocomplete).exists()).toBe(true);
        });

        it("should contain a button for resetting the fields", () => {
            const resetFn = () => {};
            const wrapper = shallow(
                <AdvancedSearchDesktop
                    open
                    resetAdvancedSearch={resetFn}
                />
            );

            expect(wrapper.find({ _id: "reset_btn" }).find(Button).exists()).toBe(true);
        });

    });

    describe("interaction", () => {
        it("should call resetAdvancedSearch when Reset button is clicked", () => {
            const resetFn = jest.fn();
            const wrapper = shallow(
                <AdvancedSearchDesktop
                    open
                    resetAdvancedSearch={resetFn}
                />
            );

            wrapper.find({ _id: "reset_btn" }).find(Button).simulate("click", { preventDefault: () => {} });
            expect(resetFn).toHaveBeenCalledTimes(1);

        });
    });
});
