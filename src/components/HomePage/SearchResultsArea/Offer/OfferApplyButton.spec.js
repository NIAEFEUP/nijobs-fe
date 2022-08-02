import React from "react";
import OfferApplyButton from "./OfferApplyButton";
import { Button, createTheme, DialogTitle } from "@material-ui/core";
import { renderWithTheme } from "../../../../test-utils";
import { act, fireEvent } from "@testing-library/react";

describe("OfferApplyButton", () => {
    const theme = createTheme();

    describe("render", () => {
        it("should render Button component", () => {
            expect(
                shallow(<OfferApplyButton />)
                    .find(Button).exists()
            ).toBe(true);
        });
        it("should render 'Apply' text", () => {
            const wrapper = renderWithTheme(
                <OfferApplyButton />,
                { theme }
            );

            expect(wrapper.getByText("Apply"));
        });
    });

    describe("OfferApplyDialog", () => {
        // TODO O Dialog esta la na mesma
        it("dialog should be closed", () => {
            const wrapper = mount(<OfferApplyButton />);
            expect(wrapper.find(DialogTitle).exists()).toBe(false);
            wrapper.unmount();
        });

        it("dialog should be open", () => {
            const wrapper = mount(<OfferApplyButton open={true} />);
            expect(wrapper.find(DialogTitle).exists()).toBe(true);
            wrapper.unmount();
        });

        it("dialog should display the given URL", () => {
            const applyURL = "https://www.test.com";
            const wrapper = renderWithTheme(
                <OfferApplyButton open={true} applyURL={applyURL} />,
                { theme }
            );

            expect(wrapper.queryByText(applyURL)).toBeInTheDocument();
        });
    });

    describe("interaction", () => {
        it("should call handleToggle when apply button is clicked", () => {
            const handleToggle = jest.fn();
            const wrapper = shallow(
                <OfferApplyButton
                    handleToggle={handleToggle}
                />);
            wrapper.find(Button).first().simulate("click");
            expect(handleToggle).toHaveBeenCalledTimes(1);
        });

        it("should call handleToggle when 'go back' button is clicked", async () => {
            const handleToggle = jest.fn();
            const wrapper = renderWithTheme(
                <OfferApplyButton
                    open={true}
                    handleToggle={handleToggle}
                />, { theme }
            );

            const goBackButton = wrapper.queryByText("Go back");
            await act(() => fireEvent.click(goBackButton));

            expect(handleToggle).toHaveBeenCalledTimes(1);
        });

        it("should call handleAccept when 'continue' button is clicked", async () => {
            const handleAccept = jest.fn();
            const wrapper = renderWithTheme(
                <OfferApplyButton
                    open={true}
                    handleAccept={handleAccept}
                />, { theme }
            );

            const continueButton = wrapper.queryByText("Continue");
            await act(() => fireEvent.click(continueButton));

            expect(handleAccept).toHaveBeenCalledTimes(1);
        });
    });

});
