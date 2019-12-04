import React from "react";
import SearchBar from "./SearchBar";
import { TextField, IconButton } from "@material-ui/core";

import { Close, MoreHoriz } from "@material-ui/icons";

describe("SearchBar", () => {
    describe("render", () => {
        it("should contain a TextField with the correct value", () => {
            const searchValue = "test";
            const setSearchValue = () => {};
            const submitSearchForm = () => {};
            const wrapper = shallow(
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    submitSearchForm={submitSearchForm}
                />
            );
            expect(wrapper.find(TextField).first().prop("value")).toBe("test");
        });

        it("should render an Advanced Options Button with the correct icon", () => {
            const searchValue = "test";
            const setSearchValue = () => {};
            const submitSearchForm = () => {};

            const searchBarBasic = mount(
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    submitSearchForm={submitSearchForm}
                    advancedOptions={false}
                />);
            const buttonBasic = searchBarBasic.find(IconButton).first();
            expect(buttonBasic.find(MoreHoriz).exists()).toBe(true);

            const searchBarAdvanced = mount(
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    submitSearchForm={submitSearchForm}
                    advancedOptions={true}
                />);
            const buttonAdvanced = searchBarAdvanced.find(IconButton).first();
            expect(buttonAdvanced.find(Close).exists()).toBe(true);
        });
    });

    describe("interaction", () => {
        it("should call setSearchValue callback on search value change", () => {
            const searchValue = "test";
            const setSearchValue = jest.fn();
            const submitSearchForm = () => {};
            const wrapper = shallow(
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    submitSearchForm={submitSearchForm}
                />
            );
            wrapper.find(TextField).first().simulate("change", { target: { value: "new value" } });

            expect(setSearchValue).toHaveBeenCalledTimes(1);
            expect(setSearchValue).toHaveBeenCalledWith("new value");
        });

        it("should call handleAdvancedOptionsButtonClick callback on advanced search button click", () => {
            const searchValue = "test";
            const setSearchValue = () => {};
            const handleAdvancedOptionsButtonClick = jest.fn();
            const wrapper = mount(
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleAdvancedOptionsButtonClick={handleAdvancedOptionsButtonClick}
                />
            );
            wrapper.find(IconButton).first().simulate("click", { e: { preventDefault: () => {} } });

            expect(handleAdvancedOptionsButtonClick).toHaveBeenCalledTimes(1);
        });
    });

});
