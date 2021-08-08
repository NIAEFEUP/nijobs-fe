import React from "react";
import { renderWithStoreAndTheme, screen, fireEvent, act } from "../../../../test-utils";
import { createTheme } from "@material-ui/core/styles";
import AdminReasonModal from "./AdminReasonModal";
import Offer from "./Offer";
import { disableOffer as disableOfferService } from "../../../../services/offerVisibilityService";

jest.mock("../../../../services/offerVisibilityService");

describe("AdminReasonModal", () => {

    let setOpen, setVisibilityState, onError, offer;

    beforeEach(() => {
        setOpen = jest.fn();
        setVisibilityState = jest.fn();
        onError = jest.fn();
        offer = new Offer({
            _id: "id1",
            title: "position1",
            ownerName: "company1",
            location: "location1",
            jobStartDate: (new Date()).toISOString(),
            publishDate: "2021-04-22T22:35:57.177Z",
            publishEndDate: "2021-09-19T23:00:00.000Z",
            description: "description1",
            isHidden: false,
            adminReason: null,
            hiddenReason: null,
        });
    });
    const theme = createTheme();

    describe("render", () => {

        it("Should not appear when open prop is false", () => {
            renderWithStoreAndTheme(
                <AdminReasonModal
                    open={false}
                    setOpen={setOpen}
                    offer={offer}
                    setVisibilityState={setVisibilityState}
                    onError={onError}
                />,
                { theme }
            );

            expect(screen.queryByLabelText("Reason")).not.toBeInTheDocument();
            expect(screen.queryByText("Please enter a reason for disabling this offer.")).not.toBeInTheDocument();
        });

        it("Should appear if open prop is true", () => {
            renderWithStoreAndTheme(
                <AdminReasonModal
                    open={true}
                    setOpen={setOpen}
                    offer={offer}
                    setVisibilityState={setVisibilityState}
                    onError={onError}
                />,
                { theme }
            );

            expect(screen.queryByLabelText("Reason")).toBeInTheDocument();
            expect(screen.queryByText("Please enter a reason for disabling this offer.")).toBeInTheDocument();
            expect(screen.queryByText("Disable Offer")).toBeInTheDocument();
            expect(screen.queryByText("Cancel")).toBeInTheDocument();
        });
    });

    describe("interaction", () => {

        const handleDisableOffer = jest.fn();
        handleDisableOffer.mockImplementation(async ({
            offer,
            adminReason,
            setOpen,
            setVisibilityState,
            visibilityState,
            onError,
        }) => {
            await disableOfferService(offer.id, adminReason).then(() => {
                setOpen(false);
                offer.hiddenReason = "ADMIN_REASON";
                offer.isHidden = true;
                offer.adminReason = adminReason;
                setVisibilityState({ ...visibilityState, isVisible: false, isDisabled: true });
            }).catch((err) => {
                onError(err);
            });
        });

        beforeEach(() => {
            renderWithStoreAndTheme(
                <AdminReasonModal
                    open={true}
                    setOpen={setOpen}
                    offer={offer}
                    handleDisableOffer={handleDisableOffer}
                    setVisibilityState={setVisibilityState}
                    onError={onError}
                />,
                { theme }
            );
        });

        it("Should be closed when clicking Cancel button", () => {
            const cancelButton = screen.queryByText("Cancel");
            expect(cancelButton).toBeInTheDocument();

            fireEvent.click(cancelButton);

            expect(setOpen).toHaveBeenCalledTimes(1);
            expect(cancelButton).toBeInTheDocument();
        });

        it("Should not submit when the input is empty", async () => {
            const reason = screen.getByLabelText("Reason");
            const submitButton = screen.queryByText("Disable Offer");
            const helperText = screen.queryByText("Please enter a reason for disabling this offer.");
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
            expect(onError).toHaveBeenCalledTimes(0);
            expect(helperText).toBeInTheDocument();
        });

        it("Should submit when the input is not empty", async () => {

            disableOfferService.mockImplementationOnce(() => new Promise((resolve) => resolve()));

            const reason = screen.getByLabelText("Reason");
            const submitButton = screen.queryByText("Disable Offer");
            expect(submitButton).toBeInTheDocument();

            await act(async () => {
                await fireEvent.change(reason, { target: { value: "This offer is offensive." } });
            });
            await act(async () => {
                await fireEvent.click(submitButton);
            });

            expect(setVisibilityState).toHaveBeenCalledTimes(1);
            expect(setOpen).toHaveBeenCalledTimes(1);
            expect(onError).toHaveBeenCalledTimes(0);
        });

        it("Should deal with promise error if the service fails", async () => {

            disableOfferService.mockImplementationOnce(() => Promise.reject());

            const reason = screen.getByLabelText("Reason");
            const submitButton = screen.queryByText("Disable Offer");
            expect(submitButton).toBeInTheDocument();

            await act(async () => {
                await fireEvent.change(reason, { target: { value: "This offer is offensive." } });
            });
            await act(async () => {
                await fireEvent.click(submitButton);
            });

            expect(setVisibilityState).toHaveBeenCalledTimes(0);
            expect(setOpen).toHaveBeenCalledTimes(0);
            expect(onError).toHaveBeenCalledTimes(1);
        });
    });
});
