import React from "react";
import { render, fireEvent, act } from "../../../../test-utils";
import AdminReasonModal from "./AdminReasonModal";
import Offer from "./Offer";
import { disableOffer } from "../../../../services/offerVisibilityService";

jest.mock("../../../../services/offerVisibilityService");

describe("AdminReasonModal", () => {

    let setOpen, setVisibilityState, dealWithPromiseError, offer;

    beforeEach(() => {
        setOpen = jest.fn();
        setVisibilityState = jest.fn();
        dealWithPromiseError = jest.fn();
        offer = new Offer({
            id: "id1",
            title: "position1",
            ownerName: "company1",
            location: "location1",
            jobStartDate: (new Date()).toISOString(),
            publishDate: "2021-04-22T22:35:57.177Z",
            publishEndDate: "2021-09-19T23:00:00.000Z",
            description: "description1",
        });
    });

    describe("render", () => {

        it("Should not appear when open prop is false", () => {
            const wrapper = render(
                <AdminReasonModal
                    open={false}
                    setOpen={setOpen}
                    offer={offer}
                    visibilityState={ { isVisible: true, isDisabled: false } }
                    setVisibilityState={setVisibilityState}
                    dealWithPromiseError={dealWithPromiseError}
                />
            );
            const labelText = wrapper.queryByLabelText("Reason");
            const descriptionText = wrapper.queryByText("Please enter a reason for disabling this offer.");
            expect(labelText).not.toBeInTheDocument();
            expect(descriptionText).not.toBeInTheDocument();
        });

        it("Should appear if open prop is true", () => {
            const wrapper = render(
                <AdminReasonModal
                    open={true}
                    setOpen={setOpen}
                    offer={offer}
                    visibilityState={ { isVisible: true, isDisabled: false } }
                    setVisibilityState={setVisibilityState}
                    dealWithPromiseError={dealWithPromiseError}
                />
            );
            const labelText = wrapper.queryByLabelText("Reason");
            const descriptionText = wrapper.queryByText("Please enter a reason for disabling this offer.");
            const submitButton = wrapper.queryByText("Disable Offer");
            const cancelButton = wrapper.queryByText("Cancel");
            expect(labelText).toBeInTheDocument();
            expect(descriptionText).toBeInTheDocument();
            expect(submitButton).toBeInTheDocument();
            expect(cancelButton).toBeInTheDocument();
        });
    });

    describe("interaction", () => {

        let wrapper;

        beforeEach(() => {
            wrapper = render(
                <AdminReasonModal
                    open={true}
                    setOpen={setOpen}
                    offer={offer}
                    visibilityState={ { isVisible: true, isDisabled: false } }
                    setVisibilityState={setVisibilityState}
                    dealWithPromiseError={dealWithPromiseError}
                />
            );
        });

        it("Should be closed when clicking Cancel button", () => {
            const cancelButton = wrapper.queryByText("Cancel");
            expect(cancelButton).toBeInTheDocument();

            fireEvent.click(cancelButton);

            expect(setOpen).toHaveBeenCalledTimes(1);
            expect(cancelButton).toBeInTheDocument();
        });

        it("Should not submit when the input is empty", async () => {
            const reason = wrapper.getByLabelText("Reason");
            const submitButton = wrapper.queryByText("Disable Offer");
            const helperText = wrapper.queryByText("Please enter a reason for disabling this offer.");
            expect(submitButton).toBeInTheDocument();
            expect(helperText).toBeInTheDocument();

            await act(async () => {
                await fireEvent.change(reason, { target: { value: "" } });
            });
            await act(async () => {
                await fireEvent.click(submitButton);
            });

            expect(setVisibilityState).toHaveBeenCalledTimes(0);
            expect(setOpen).toHaveBeenCalledTimes(0);
            expect(dealWithPromiseError).toHaveBeenCalledTimes(0);
            expect(helperText).toBeInTheDocument();
        });

        it("Should submit when the input is not empty", async () => {

            disableOffer.mockImplementationOnce(() => new Promise((resolve) => resolve()));

            const reason = wrapper.getByLabelText("Reason");
            const submitButton = wrapper.queryByText("Disable Offer");
            expect(submitButton).toBeInTheDocument();

            await act(async () => {
                await fireEvent.change(reason, { target: { value: "This offer is offensive." } });
            });
            await act(async () => {
                await fireEvent.click(submitButton);
            });

            expect(setVisibilityState).toHaveBeenCalledTimes(1);
            expect(setOpen).toHaveBeenCalledTimes(1);
            expect(dealWithPromiseError).toHaveBeenCalledTimes(0);
        });

        it("Should deal with promise error if the service fails", async () => {

            disableOffer.mockImplementationOnce(() => Promise.reject());

            const reason = wrapper.getByLabelText("Reason");
            const submitButton = wrapper.queryByText("Disable Offer");
            expect(submitButton).toBeInTheDocument();

            await act(async () => {
                await fireEvent.change(reason, { target: { value: "This offer is offensive." } });
            });
            await act(async () => {
                await fireEvent.click(submitButton);
            });

            expect(setVisibilityState).toHaveBeenCalledTimes(0);
            expect(setOpen).toHaveBeenCalledTimes(0);
            expect(dealWithPromiseError).toHaveBeenCalledTimes(1);
        });
    });
});
