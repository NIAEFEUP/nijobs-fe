import React from "react";
import SearchBar from "./SearchBar";
import { TextField } from "@material-ui/core";

describe("SearchBar", () => {
    describe("render", () => {
        it("should contain a TextField with the correct value", () => {
            const searchValue = "test";
            const setSearchValue = () => {};
            const wrapper = shallow(
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
            );
            expect(wrapper.find(TextField).first().prop("value")).toBe("test");
        });

    });

    describe("interaction", () => {
        it("should call setSearchValue callback on search value change", () => {
            const searchValue = "test";
            const setSearchValue = jest.fn();
            const wrapper = shallow(
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
            );
            wrapper.find(TextField).first().simulate("change", { target: { value: "new value" } });

            expect(setSearchValue).toHaveBeenCalledTimes(1);
            expect(setSearchValue).toHaveBeenCalledWith("new value");
        });

        it("should call onEnterPress if enter is pressed", () => {
            const onEnterPress = jest.fn();
            const wrapper = mount(
                <SearchBar
                    onEnterPress={onEnterPress}
                />
            );

            wrapper.find("input").simulate("keypress", { key: "Enter" });
            wrapper.find("input").simulate("keypress", { key: "Backspace" });
            expect(onEnterPress).toHaveBeenCalledTimes(1);
        });
    });

});
