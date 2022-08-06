import React from "react";
import OfferApplyButton from "./OfferApplyButton";
import { Button, createTheme } from "@material-ui/core";
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
        it("dialog should be closed", () => {
            const title = "test title";
            const wrapper = renderWithTheme(
                <OfferApplyButton title={title} />,
                { theme }
            );
            expect(wrapper.queryByText(title)).not.toBeInTheDocument();
        });

        it("dialog should be open", () => {
            const title = "test title";
            const wrapper = renderWithTheme(
                <OfferApplyButton title={title} open={true} />,
                { theme }
            );
            expect(wrapper.queryByText(title)).toBeInTheDocument();
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
        it("should call handleToggle when apply button is clicked", async () => {
            const handleToggle = jest.fn();
            const wrapper = renderWithTheme(
                <OfferApplyButton
                    handleToggle={handleToggle}
                />, { theme });
            const applyButton = wrapper.queryByText("Apply");
            await act(() => fireEvent.click(applyButton));

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
