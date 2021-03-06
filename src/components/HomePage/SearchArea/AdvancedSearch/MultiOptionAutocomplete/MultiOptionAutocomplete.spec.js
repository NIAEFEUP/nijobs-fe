import React from "react";
import MultiOptionAutocomplete from "./MultiOptionAutocomplete";
import { TextField, Chip } from "@material-ui/core";

describe("MultiOptionAutocomplete", () => {

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

    describe("render", () => {
        it("should render the component specified in renderInput", () => {

            const TestComponent = () => (
                <TextField _id="test" />
            );

            const AutocompleteProps = {
                renderInput: TestComponent,
            };

            const Props = {
                ...AutocompleteProps,
                autocompleteProps,
            };
            const wrapper = shallow(
                <MultiOptionAutocomplete
                    {...Props}
                />
            );

            expect(wrapper.find({ _id: "test" }).find(TextField).exists()).toBe(true);
        });

        it("should render the values in chips", () => {

            const TestComponent = () => (
                <TextField _id="test" />
            );

            const AutocompleteProps = {
                renderInput: TestComponent,
            };

            const Props = {
                ...AutocompleteProps,
                autocompleteProps: {
                    ...autocompleteProps,
                    value: ["val1", "val2"],
                },
            };
            const wrapper = shallow(
                <MultiOptionAutocomplete
                    {...Props}
                />
            );

            expect(wrapper.find(Chip).at(0).prop("label")).toBe("val1");
            expect(wrapper.find(Chip).at(1).prop("label")).toBe("val2");
        });
    });
});
