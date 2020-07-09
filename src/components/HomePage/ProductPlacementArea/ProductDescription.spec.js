import React from "react";
import { ProductDescription } from "./ProductDescription";
import { Button } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";

describe("<ProductDescription /> interaction", () => {

    it("should open login modal", () => {
        const toggleLoginModalMock = jest.fn();
        const wrapper = mount(
            <Router>
                <ProductDescription toggleLoginModal={toggleLoginModalMock}/>
            </Router>
        );

        expect(wrapper.find(Button).text()).toBe("Login");
        wrapper.find(Button).first().simulate("click");
        expect(toggleLoginModalMock).toHaveBeenCalledTimes(1);

    });

});
