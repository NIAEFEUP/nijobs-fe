import React from "react";
import OfferContent from "./OfferContent";
import Offer from "./Offer";
import { renderWithStoreAndTheme, screen, act, fireEvent } from "../../../../test-utils";
import { createMuiTheme } from "@material-ui/core";
import LOADING_MESSAGES from "./offerLoadingMessages";
import { format, parseISO, formatDistanceToNowStrict } from "date-fns";
import { SnackbarProvider } from "notistack";
import useSession from "../../../../hooks/useSession";

import Notifier from "../../../Notifications/Notifier";

jest.mock("../../../../hooks/useSession");

describe("OfferContent", () => {

    let offer = new Offer({
        id: "id1",
        title: "position1",
        owner: "company_id",
        ownerName: "company1",
        ownerLogo: "",
        location: "location1",
        jobStartDate: (new Date()).toISOString(),
        publishDate: "2021-04-22T22:35:57.177Z",
        publishEndDate: "2021-09-19T23:00:00.000Z",
        description: "description1",
    });
    const theme = createMuiTheme();

    describe("render", () => {

        it("should render placeholder content when no offer selected", () => {

            useSession.mockImplementation(() => ({ isLoggedIn: false }));

            renderWithStoreAndTheme(
                <OfferContent offer={null} />,
                { theme }
            );

            expect(screen.getByText("Please select an offer to view the details")).toBeInTheDocument();
        });

        it("should render a valid loading message", () => {

            useSession.mockImplementation(() => ({ isLoggedIn: false }));

            renderWithStoreAndTheme(
                <OfferContent loading />,
                { theme }
            );

            expect(LOADING_MESSAGES.includes(screen.getByTestId("random-loading-message").textContent))
                .toBe(true);
        });

        describe("offer selected", () => {

            it("should render offer details", () => {

                useSession.mockImplementation(() => ({ isLoggedIn: false }));

                renderWithStoreAndTheme(
                    <OfferContent offer={offer} />,
                    { theme }
                );

                expect(screen.getByRole("heading", { name: offer.title, level: 4 })).toBeInTheDocument();
                expect(screen.getByRole("heading", { name: offer.ownerName, level: 6 })).toBeInTheDocument();
                expect(screen.getByText(offer.location)).toBeInTheDocument();
                expect(screen.getByText(format(parseISO(offer.jobStartDate), "dd-MM-yyyy"))).toBeInTheDocument();
                expect(screen.getByText(formatDistanceToNowStrict(parseISO(offer.publishDate), { addSuffix: true }))).toBeInTheDocument();
                expect(screen.getByText(offer.description)).toBeInTheDocument();
                expect(screen.getByText(offer.location)).toBeInTheDocument();
            });
        });

        describe("offer publish end date", () => {

            it("should not show publish end date by default", () => {

                useSession.mockImplementation(() => ({ isLoggedIn: false }));

                renderWithStoreAndTheme(
                    <OfferContent offer={offer} />,
                    { theme }
                );

                expect(screen.getByRole("heading", { name: offer.title, level: 4 })).toBeInTheDocument();
                expect(screen.getByRole("heading", { name: offer.ownerName, level: 6 })).toBeInTheDocument();
                expect(screen.queryByText(format(parseISO(offer.publishEndDate), "dd-MM-yyyy"), { exact: false })).not.toBeInTheDocument();
            });

            it("should show publish end date to admins", () => {

                useSession.mockImplementation(() => ({ isLoggedIn: true, data: { email: "admin@admin.com", isAdmin: true } }));

                renderWithStoreAndTheme(
                    <OfferContent offer={offer} />,
                    { theme }
                );

                expect(screen.queryByText("until", { exact: false })).toBeInTheDocument();
                expect(screen.queryByText(format(parseISO(offer.publishEndDate), "dd-MM-yyyy"), { exact: false })).toBeInTheDocument();
            });

            it("should show publish end date to the company owner of the offer", () => {

                useSession.mockImplementation(() => ({
                    isLoggedIn: true, data: { company: { name: "company1", _id: "company_id" } },
                }));

                renderWithStoreAndTheme(
                    <OfferContent offer={offer} />,
                    { theme }
                );

                expect(screen.queryByText("until", { exact: false })).toBeInTheDocument();
                expect(screen.queryByText(format(parseISO(offer.publishEndDate), "dd-MM-yyyy"), { exact: false })).toBeInTheDocument();
            });
        });

        describe("hidden offer", () => {

            offer = new Offer({
                id: "id1",
                title: "position1",
                owner: "company_id",
                ownerName: "company1",
                ownerLogo: "",
                location: "location1",
                jobStartDate: (new Date()).toISOString(),
                publishDate: "2021-04-22T22:35:57.177Z",
                publishEndDate: "2021-09-19T23:00:00.000Z",
                description: "description1",
                isHidden: true,
                hiddenReason: "ADMIN_REQUEST",
                adminReason: "This offer is offensive",
            });

            it("should show a message to the company owner informing that the offer is hidden", () => {

                useSession.mockImplementation(() => ({
                    isLoggedIn: true, data: { company: { name: "company1", _id: "company_id" } },
                }));

                renderWithStoreAndTheme(
                    <OfferContent offer={offer} />,
                    { theme }
                );

                expect(screen.queryByText(
                    "This offer was hidden by an admin so it won't show up in search results.",
                    { exact: false })
                ).toBeInTheDocument();
                expect(screen.queryByText("Please contact support for more information.", { exact: false })).toBeInTheDocument();
            });

            it("should not show admin reason to the company owner of the offer", () => {

                useSession.mockImplementation(() => ({
                    isLoggedIn: true, data: { company: { name: "company1", _id: "company_id" } },
                }));

                renderWithStoreAndTheme(
                    <OfferContent offer={offer} />,
                    { theme }
                );

                expect(screen.queryByText(offer.adminReason, { exact: false })).not.toBeInTheDocument();
            });

            it("should show admin reason to admins", () => {

                useSession.mockImplementation(() => ({ isLoggedIn: true, data: { email: "admin@admin.com", isAdmin: true } }));

                renderWithStoreAndTheme(
                    <OfferContent offer={offer} />,
                    { theme }
                );

                expect(screen.queryByText("Offer disabled by an admin. Reason:", { exact: false })).toBeInTheDocument();
                expect(screen.queryByText(offer.adminReason, { exact: false })).toBeInTheDocument();
            });
        });
    });

    describe("interaction", () => {

        beforeEach(() => {
            fetch.resetMocks();
        });

        it ("should hide offer if the owner company clicks the hide button", async () => {

            const anotherOffer = new Offer({
                id: "id1",
                title: "position1",
                owner: "company_id",
                ownerName: "company1",
                ownerLogo: "",
                location: "location1",
                jobStartDate: (new Date()).toISOString(),
                publishDate: "2021-04-22T22:35:57.177Z",
                publishEndDate: "2021-09-19T23:00:00.000Z",
                description: "description1",
                isHidden: false,
                hiddenReason: null,
                adminReason: null,
            });

            // Simulate request success
            fetch.mockResponse(JSON.stringify({ mockData: true }));

            useSession.mockImplementation(() => ({
                isLoggedIn: true, data: { company: { name: "company1", _id: "company_id" } },
            }));

            renderWithStoreAndTheme(
                <OfferContent offer={anotherOffer} />,
                { theme }
            );

            expect(screen.queryByText(
                "This offer is hidden so it won't show up in search results",
                { exact: false }
            )).not.toBeInTheDocument();

            const visibilityButton = screen.getByRole("hideEnableOfferButton");
            expect(visibilityButton).toBeInTheDocument();

            await act(async () => {
                await fireEvent.click(visibilityButton);
            });

            expect(screen.queryByText(
                "This offer is hidden so it won't show up in search results", { exact: false }
            )).toBeInTheDocument();
        });

        it ("should hide offer if an admin clicks the hide button", async () => {

            const anotherOffer = new Offer({
                id: "id1",
                title: "position1",
                owner: "company_id",
                ownerName: "company1",
                ownerLogo: "",
                location: "location1",
                jobStartDate: (new Date()).toISOString(),
                publishDate: "2021-04-22T22:35:57.177Z",
                publishEndDate: "2021-09-19T23:00:00.000Z",
                description: "description1",
                isHidden: false,
                hiddenReason: null,
                adminReason: null,
            });

            // Simulate request success
            fetch.mockResponse(JSON.stringify({ mockData: true }));

            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { email: "admin@admin.com", isAdmin: true } }));

            renderWithStoreAndTheme(
                <OfferContent offer={anotherOffer} />,
                { theme }
            );

            expect(screen.queryByText(
                "This offer is hidden so it won't show up in search results",
                { exact: false }
            )).not.toBeInTheDocument();

            const visibilityButton = screen.getByRole("hideEnableOfferButton");
            expect(visibilityButton).toBeInTheDocument();

            await act(async () => {
                await fireEvent.click(visibilityButton);
            });

            expect(screen.queryByText(
                "This offer is hidden so it won't show up in search results", { exact: false }
            )).toBeInTheDocument();
        });

        it ("should enable hidden offer if the owner company clicks the enable button", async () => {

            const anotherOffer = new Offer({
                id: "id1",
                title: "position1",
                owner: "company_id",
                ownerName: "company1",
                ownerLogo: "",
                location: "location1",
                jobStartDate: (new Date()).toISOString(),
                publishDate: "2021-04-22T22:35:57.177Z",
                publishEndDate: "2021-09-19T23:00:00.000Z",
                description: "description1",
                isHidden: true,
                hiddenReason: "COMPANY_REQUEST",
                adminReason: null,
            });

            // Simulate request success
            fetch.mockResponse(JSON.stringify({ mockData: true }));

            useSession.mockImplementation(() => ({
                isLoggedIn: true, data: { company: { name: "company1", _id: "company_id" } },
            }));

            renderWithStoreAndTheme(
                <OfferContent offer={anotherOffer} />,
                { theme }
            );

            expect(screen.queryByText(
                "This offer is hidden so it won't show up in search results",
                { exact: false }
            )).toBeInTheDocument();

            const visibilityButton = screen.getByRole("hideEnableOfferButton");
            expect(visibilityButton).toBeInTheDocument();

            await act(async () => {
                await fireEvent.click(visibilityButton);
            });

            expect(screen.queryByText(
                "This offer is hidden so it won't show up in search results",
                { exact: false }
            )).not.toBeInTheDocument();
        });

        it ("should show special message if the owner company is blocked", () => {

            const anotherOffer = new Offer({
                id: "id1",
                title: "position1",
                owner: "company_id",
                ownerName: "company1",
                ownerLogo: "",
                location: "location1",
                jobStartDate: (new Date()).toISOString(),
                publishDate: "2021-04-22T22:35:57.177Z",
                publishEndDate: "2021-09-19T23:00:00.000Z",
                description: "description1",
                isHidden: true,
                hiddenReason: "COMPANY_BLOCKED",
                adminReason: null,
            });

            // Simulate request success
            fetch.mockResponse(JSON.stringify({ mockData: true }));

            useSession.mockImplementation(() => ({
                isLoggedIn: true, data: { company: { name: "company1", _id: "company_id" } },
            }));

            renderWithStoreAndTheme(
                <OfferContent offer={anotherOffer} />,
                { theme }
            );

            expect(screen.queryByText(
                "This offer is hidden, because the company is blocked.",
                { exact: false }
            )).toBeInTheDocument();
        });

        it ("should open admin reason modal if an admin clicks the disable button", async () => {

            const anotherOffer = new Offer({
                id: "id1",
                title: "position1",
                owner: "company_id",
                ownerName: "company1",
                ownerLogo: "",
                location: "location1",
                jobStartDate: (new Date()).toISOString(),
                publishDate: "2021-04-22T22:35:57.177Z",
                publishEndDate: "2021-09-19T23:00:00.000Z",
                description: "description1",
                isHidden: false,
                hiddenReason: null,
                adminReason: null,
            });

            // Simulate request success
            fetch.mockResponse(JSON.stringify({ mockData: true }));

            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { email: "admin@admin.com", isAdmin: true } }));

            renderWithStoreAndTheme(
                <OfferContent offer={anotherOffer} />,
                { theme }
            );

            expect(screen.queryByText("Offer disabled by an admin.", { exact: false })).not.toBeInTheDocument();

            const disableButton = screen.getByRole("disableEnableOfferButton");
            expect(disableButton).toBeInTheDocument();

            await act(async () => {
                await fireEvent.click(disableButton);
            });

            expect(screen.queryByText("Please enter a reason for disabling this offer.")).toBeInTheDocument();
            expect(screen.queryByLabelText("Reason")).toBeInTheDocument();
            expect(screen.queryByText("Cancel")).toBeInTheDocument();
        });

        it ("should not let owner company enable offer is it was disabled by admin", async () => {

            const anotherOffer = new Offer({
                id: "id1",
                title: "position1",
                owner: "company_id",
                ownerName: "company1",
                ownerLogo: "",
                location: "location1",
                jobStartDate: (new Date()).toISOString(),
                publishDate: "2021-04-22T22:35:57.177Z",
                publishEndDate: "2021-09-19T23:00:00.000Z",
                description: "description1",
                isHidden: true,
                hiddenReason: "ADMIN_REQUEST",
                adminReason: "This offer is offensive.",
            });

            // Simulate request success
            fetch.mockResponse(JSON.stringify({ mockData: true }));

            useSession.mockImplementation(() => ({
                isLoggedIn: true, data: { company: { name: "company1", _id: "company_id" } },
            }));

            renderWithStoreAndTheme(
                <OfferContent offer={anotherOffer} />,
                { theme }
            );

            expect(screen.queryByText(
                "This offer was hidden by an admin so it won't show up in search results. "
                + "Please contact support for more information."
            )).toBeInTheDocument();

            const visibilityButton = screen.getByRole("hideEnableOfferButton");
            expect(visibilityButton).toBeInTheDocument();

            await act(async () => {
                await fireEvent.click(visibilityButton);
            });

            expect(screen.queryByText(
                "This offer was hidden by an admin so it won't show up in search results. "
                + "Please contact support for more information."
            )).toBeInTheDocument();
        });

        it ("should let admins enable offer if it is disabled", async () => {

            const adminReason = "This offer is offensive.";

            const anotherOffer = new Offer({
                id: "id1",
                title: "position1",
                owner: "company_id",
                ownerName: "company1",
                ownerLogo: "",
                location: "location1",
                jobStartDate: (new Date()).toISOString(),
                publishDate: "2021-04-22T22:35:57.177Z",
                publishEndDate: "2021-09-19T23:00:00.000Z",
                description: "description1",
                isHidden: true,
                hiddenReason: "ADMIN_REQUEST",
                adminReason: adminReason,
            });

            // Simulate request success
            fetch.mockResponse(JSON.stringify({ mockData: true }));

            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { email: "admin@admin.com", isAdmin: true } }));

            renderWithStoreAndTheme(
                <OfferContent offer={anotherOffer} />,
                { theme }
            );

            expect(screen.queryByText("Offer disabled by an admin.", { exact: false })).toBeInTheDocument();
            expect(screen.queryByText(anotherOffer.adminReason, { exact: false })).toBeInTheDocument();

            const visibilityButton = screen.getByRole("disableEnableOfferButton");
            expect(visibilityButton).toBeInTheDocument();

            await act(async () => {
                await fireEvent.click(visibilityButton);
            });

            // using adminReason instead of anotherOffer.adminReason,
            // because anotherOffer.adminReason is set to null when the offer is enabled
            expect(screen.queryByText(adminReason, { exact: false })).not.toBeInTheDocument();
            expect(screen.queryByText("Offer disabled by an admin.", { exact: false })).not.toBeInTheDocument();
        });

        it ("should show snackbar message if the hide offer service fails", async () => {

            const anotherOffer = new Offer({
                id: "id1",
                title: "position1",
                owner: "company_id",
                ownerName: "company1",
                ownerLogo: "",
                location: "location1",
                jobStartDate: (new Date()).toISOString(),
                publishDate: "2021-04-22T22:35:57.177Z",
                publishEndDate: "2021-09-19T23:00:00.000Z",
                description: "description1",
                isHidden: false,
                hiddenReason: null,
                adminReason: null,
            });

            // Simulate network problem
            fetch.mockAbort();

            useSession.mockImplementation(() => ({
                isLoggedIn: true, data: { company: { name: "company1", _id: "company_id" } },
            }));

            renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <Notifier />
                    <OfferContent offer={anotherOffer} />
                </SnackbarProvider>,
                { theme }
            );

            const visibilityButton = screen.getByRole("hideEnableOfferButton");
            expect(visibilityButton).toBeInTheDocument();

            await act(async () => {
                await fireEvent.click(visibilityButton);
            });

            expect(await screen.findByText("Unexpected Error. Please try again later.")).toBeInTheDocument();
        });
    });


});
