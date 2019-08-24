import React from "react";
import SearchBar from "./SearchBar";
import { TextField, IconButton } from "@material-ui/core";

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

        it("should call submitSearchForm callback on search button click", () => {
            const searchValue = "test";
            const setSearchValue = () => {};
            const submitSearchForm = jest.fn();
            const wrapper = mount(
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    submitSearchForm={submitSearchForm}
                />
            );
            wrapper.find(IconButton).first().simulate("click", { e: { preventDefault: () => {} } });

            expect(submitSearchForm).toHaveBeenCalledTimes(1);
        });
    });

});
