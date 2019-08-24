import React from "react";
import { Close, MoreHoriz } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import ShowAdvancedOptionsButton from "./ShowAdvancedOptionsButton";
import searchAreaStyle from "./SearchArea.module.css";

describe("ShowAdvancedOptionsButton", () => {
    describe("render", () => {
        it("should render correctly styled div", () => {
            expect(
                shallow(<ShowAdvancedOptionsButton isOpen={false} />)
                    .find("div").first().hasClass(searchAreaStyle.advancedSearchBtnWrapper)
            ).toBe(true);
        });
        it("should render 'more' icon when isOpen = false", () => {
            expect(shallow(<ShowAdvancedOptionsButton isOpen={false} />).find(MoreHoriz).exists()).toBe(true);
            expect(shallow(<ShowAdvancedOptionsButton isOpen={false} />).find(Close).exists()).toBe(false);
        });
        it("should render 'close' icon when isOpen = true", () => {
            expect(shallow(<ShowAdvancedOptionsButton isOpen={true} />).find(Close).exists()).toBe(true);
            expect(shallow(<ShowAdvancedOptionsButton isOpen={true} />).find(MoreHoriz).exists()).toBe(false);
        });
    });

    describe("interaction", () => {
        it("should call onClick when clicked", () => {
            const onClick = jest.fn();
            const button = shallow(
                <ShowAdvancedOptionsButton
                    isOpen={true}
                    onClick={onClick}
                />);
            button.find(Fab).first().simulate("click");
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

});
