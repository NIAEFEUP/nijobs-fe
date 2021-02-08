import React from "react";
import { ProductDescription } from "./ProductDescription";
import { Button } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import useSession from "../../../hooks/useSession";

jest.mock("../../../hooks/useSession");

describe("<ProductDescription /> interaction", () => {

    it("should open login modal", () => {
        const toggleLoginModalMock = jest.fn();
        useSession.mockImplementation(() => ({ isLoggedIn: false }));

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
