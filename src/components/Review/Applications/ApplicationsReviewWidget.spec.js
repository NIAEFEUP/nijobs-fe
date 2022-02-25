/* eslint-disable require-await */
import DateFnsUtils from "@date-io/date-fns";
import { createTheme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { act, fireEvent, getByLabelText, getDefaultNormalizer, queryByText, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format, parseISO, addDays } from "date-fns";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Simulate } from "react-dom/test-utils";
import config from "../../../config";

import { renderWithStoreAndTheme } from "../../../test-utils";
import { createMatchMedia } from "../../../utils/media-queries";
import Notifier from "../../Notifications/Notifier";
import { ApplicationStateLabel, columns } from "./ApplicationsReviewTableSchema";
import ApplicationsReviewWidget from "./ApplicationsReviewWidget";
const { API_HOSTNAME } = config;

jest.useFakeTimers("modern");

const generateApplication = (id, state) => {
    const application = {
        _id: `id-${id}`,
        email: `company${id}@niaefeup.com`,
        companyName: `Company ${id}, Ltd.`,
        motivation: `motivation ${id}`,
        submittedAt: addDays(new Date(Date.now()), id).toISOString(),
        __v: 0,
        state: state,
        id: `id-${id}`,
    };

    if (state === "REJECTED") {
        application.rejectReason = "asjdnasjnlasndklnaslkdnlasd\n\n\nasdjbasljdjasdnalsnd\n\n\nasdhsakdas";
        application.rejectedAt = addDays(new Date(Date.now() + 100), id + 1).toISOString();
    }

    if (state === "APPROVED") {
        application.approvedAt = addDays(new Date(Date.now() + 100), id + 1).toISOString();
    }

    return application;
};

const generateApplications = (n, forceState) => {
    const STATES = Object.keys(ApplicationStateLabel);
    const applications = [];
    for (let i = 0; i < n; i++) {
        applications.push(generateApplication(
            i,
            forceState || STATES[i % 3]
        ));
    }
    return applications;
};

const clickAwayFromFilterMenu = () => {
    // Don't really know why/how this works, but this was the only way I found to close the state selector+filter popover
    screen.queryAllByRole("presentation")
        .forEach((el) => {
            Simulate.click(el.firstElementChild);
        });
    screen.queryAllByRole("presentation")
        .forEach((el) => {
            Simulate.click(el.firstElementChild);
        });
};

describe("Application Review Widget", () => {

    const theme = createTheme({});

    beforeEach(() => {
        fetch.resetMocks();
    });

    it("Should load current application reviews", async () => {

        const applications = generateApplications(3);
        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () => { // Necessary since the component auto mutates its state when loading the rows
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme });
        });

        for (const application of applications) {
            try {
                const applicationRow = screen.queryByText(application.companyName).closest("tr");
                expect(queryByText(applicationRow, application.companyName)).toBeInTheDocument();
                expect(queryByText(applicationRow, ApplicationStateLabel[application.state])).toBeInTheDocument();
                expect(queryByText(applicationRow, format(parseISO(application.submittedAt), "yyyy-MM-dd"))).toBeInTheDocument();

                fireEvent.click(getByLabelText(applicationRow, "More Actions"));

                expect(queryByText(applicationRow.nextElementSibling, application.email)).toBeInTheDocument();
                expect(queryByText(applicationRow.nextElementSibling, application.motivation)).toBeInTheDocument();

                if (application.state === "REJECTED") {
                    expect(queryByText(applicationRow.nextElementSibling,
                        `Reject Reason (Rejected at ${format(parseISO(application.rejectedAt), "yyyy-MM-dd")})`
                    )).toBeInTheDocument();
                    expect(queryByText(applicationRow.nextElementSibling, application.rejectReason, {
                        normalizer: getDefaultNormalizer({ collapseWhitespace: false }), // Necessary to prevent RTL from collapsing \n
                    })).toBeInTheDocument();

                }
            } catch (e) {
                throw new Error(`Failed checking company ${application.companyName}\n\n${e}`);
            }
        }

    });

    /* it("Should change number of rows visible", async () => {
        const applications = generateApplications(25);
        fetch.mockResponse(JSON.stringify({ applications }));

        // Necessary to wrap in act() since the component auto-mutates its state when loading the rows
        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        const numRowsOptions = [5, 10, 25];

        for (let i = 0; i < numRowsOptions.length; i++) {
            if (i !== 0)
                fireEvent.click(screen.getByText(`${numRowsOptions[i]}`)); // Show num pages select box

            const expectedNumRows = numRowsOptions[i];
            expect(screen.getAllByTestId("application-row").length).toBe(expectedNumRows);

            // screen.debug();

            fireEvent.mouseDown(screen.getByLabelText(`Rows per page: ${numRowsOptions[i]}`)); // Show num pages select box
        }
    }); */

    it("Should approve an application", async () => {
        const applications = generateApplications(1, "PENDING");

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        fireEvent.click(screen.getByLabelText("Approve Application"));
        fireEvent.click(screen.getByLabelText("Confirm Approval"));

        expect(screen.getByLabelText("Approve Application")).toBeDisabled();
        expect(screen.getByLabelText("Reject Application")).toBeDisabled();

        await act(async () => {
            await jest.advanceTimersByTime(2000);
        });

        // Show undo Notification
        expect(screen.queryByText(`Approving Application for ${applications[0].companyName}...`)).toBeInTheDocument();

        await act(async () => {
            await jest.runAllTimers();
        });

        expect(fetch.mock.calls[1][0])
            .toEqual(`${API_HOSTNAME}/applications/company/${applications[0].id}/approve`, { credentials: "include", method: "POST" });
    });

    it("Should maintain state filter after approving an application", async () => {
        const applications = generateApplications(1, "PENDING");

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        // Open state selector and select pending option
        fireEvent.click(screen.getByLabelText("Filter list"));
        userEvent.click(screen.getByLabelText("State"));
        fireEvent.click(screen.getByLabelText("Pending"));

        expect((await screen.getAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(2)").textContent)
        ).toStrictEqual(applications.filter((a) => a.state === "PENDING").map((a) => a.companyName));

        clickAwayFromFilterMenu();

        fireEvent.click(screen.getByLabelText("Approve Application"));
        fireEvent.click(screen.getByLabelText("Confirm Approval"));

        await act(async () => {
            await jest.advanceTimersByTime(2000);
        });

        // Show undo Notification
        expect(screen.queryByText(`Approving Application for ${applications[0].companyName}...`)).toBeInTheDocument();

        await act(async () => {
            await jest.runAllTimers();
        });

        expect(fetch.mock.calls[1][0])
            .toEqual(`${API_HOSTNAME}/applications/company/${applications[0].id}/approve`, { credentials: "include", method: "POST" });

        // Should be empty since application is not pending anymore
        expect(screen.queryAllByTestId("application-row")).toStrictEqual([]);
    });

    it("Should reject an application", async () => {
        const applications = generateApplications(1, "PENDING");

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        fireEvent.click((screen.getByLabelText("Reject Application")));

        await userEvent.type(screen.getByLabelText("Reject Reason"), "valid reject reason");

        expect((screen.getByLabelText("Reject"))).not.toBeDisabled();

        await act(async () => {
            await fireEvent.submit(screen.getByLabelText("Reject"));
        });

        expect(screen.getByLabelText("Approve Application")).toBeDisabled();
        expect(screen.getByLabelText("Reject Application")).toBeDisabled();

        await act(async () => {
            await jest.advanceTimersByTime(2000);
        });

        // Show undo Notification
        expect(screen.queryByText(`Rejecting Application for ${applications[0].companyName}...`)).toBeInTheDocument();

        await act(async () => {
            await jest.runAllTimers();
        });

        expect(fetch.mock.calls[1][0])
            .toEqual(`${API_HOSTNAME}/applications/company/${applications[0].id}/reject`, { credentials: "include", method: "POST" });
    });

    it("Should maintain state filter after rejecting an application", async () => {
        const applications = generateApplications(1, "PENDING");

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        // Open state selector and select pending option
        fireEvent.click(screen.getByLabelText("Filter list"));
        fireEvent.mouseDown(screen.getByLabelText("State"));
        fireEvent.click(screen.getByLabelText("Pending"));

        expect(screen.getAllByTestId("application-row")
            .map((el) => el.querySelector("td:nth-child(2)").textContent)
        ).toStrictEqual(applications.filter((a) => a.state === "PENDING").map((a) => a.companyName));

        clickAwayFromFilterMenu();

        fireEvent.click(screen.getByLabelText("Reject Application"));
        await userEvent.type(screen.getByLabelText("Reject Reason"), "valid reject reason");
        expect(screen.getByLabelText("Reject")).not.toBeDisabled();
        fireEvent.submit(screen.getByLabelText("Reject"));

        await act(async () => {
            await jest.advanceTimersByTime(2000);
        });

        // Show undo Notification
        expect(screen.queryByText(`Rejecting Application for ${applications[0].companyName}...`)).toBeInTheDocument();

        await act(async () => {
            await jest.runAllTimers();
        });

        expect(fetch.mock.calls[1][0])
            .toEqual(`${API_HOSTNAME}/applications/company/${applications[0].id}/reject`, { credentials: "include", method: "POST" });

        // Should be empty since application is not pending anymore
        expect(screen.queryAllByTestId("application-row")).toStrictEqual([]);
    });

    it("Should not allow rejecting with invalid reject reason", async () => {
        const applications = generateApplications(1, "PENDING");

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        fireEvent.click(screen.getByLabelText("Reject Application"));

        await act(async () => {
            await userEvent.type(screen.getByLabelText("Reject Reason"), "invalid"); // Too short
        });
        expect(screen.getByLabelText("Reject")).toBeDisabled();
    });

    it("Should select application review", async () => {
        const applications = generateApplications(2);

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        expect(screen.queryByText(`${0} selected`)).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole("checkbox", { name: applications[0].companyName }));

        expect(screen.getByRole("checkbox", { name: applications[0].companyName })).toBeChecked();
        expect(screen.getByRole("checkbox", { name: applications[1].companyName })).not.toBeChecked();
        expect(screen.getByText(`${1} selected`)).toBeInTheDocument();

        fireEvent.click(screen.getByRole("checkbox", { name: applications[1].companyName }));

        expect(screen.getByRole("checkbox", { name: applications[0].companyName })).toBeChecked();
        expect(screen.getByRole("checkbox", { name: applications[1].companyName })).toBeChecked();
        expect(screen.getByText(`${2} selected`)).toBeInTheDocument();

        fireEvent.click(screen.getByRole("checkbox", { name: applications[0].companyName }));

        expect(screen.getByRole("checkbox", { name: applications[0].companyName })).not.toBeChecked();
        expect(screen.getByRole("checkbox", { name: applications[1].companyName })).toBeChecked();
        expect(screen.getByText(`${1} selected`)).toBeInTheDocument();

    });

    it("Should select all application reviews", async () => {
        const applications = generateApplications(2);

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        fireEvent.click(screen.getByRole("checkbox", { name: "Select all applications on current page" }));

        expect(screen.getByRole("checkbox", { name: "Select all applications on current page" })).toBeChecked();
        expect(screen.getByRole("checkbox", { name: applications[0].companyName })).toBeChecked();
        expect(screen.getByRole("checkbox", { name: applications[1].companyName })).toBeChecked();

        fireEvent.click(screen.getByRole("checkbox", { name: "Select all applications on current page" }));

        expect(screen.getByRole("checkbox", { name: "Select all applications on current page" })).not.toBeChecked();
        expect(screen.getByRole("checkbox", { name: applications[0].companyName })).not.toBeChecked();
        expect(screen.getByRole("checkbox", { name: applications[1].companyName })).not.toBeChecked();

    });

    it("Should dismiss selection on page change", async () => {
        const applications = generateApplications(6);

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        fireEvent.click(screen.getByRole("checkbox", { name: "Select all applications on current page" }));
        expect(screen.getByRole("checkbox", { name: "Select all applications on current page" })).toBeChecked();
        fireEvent.click(screen.getByRole("button", { name: "Next page" }));
        expect(screen.getByRole("checkbox", { name: "Select all applications on current page" })).not.toBeChecked();
        fireEvent.click(screen.getByRole("button", { name: "Previous page" }));
        expect(screen.getByRole("checkbox", { name: "Select all applications on current page" })).not.toBeChecked();

    });

    it("Should only render mobile columns on mobile device", async () => {
        const MOBILE_WIDTH_PX = 360;
        window.matchMedia = createMatchMedia(MOBILE_WIDTH_PX);

        const applications = generateApplications(6);
        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget isMobile={true} />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        const mobileCols = ["name", "state", "actions"];
        for (const [col, val] of Object.entries(columns)) {
            if (mobileCols.includes(col)) {
                expect(screen.getByRole("button", { name: val.label })).toBeInTheDocument();
            } else {
                expect(screen.queryByRole("button", { name: val.label })).not.toBeInTheDocument();
            }
        }
    });

    it("Should render mobile collapsable content on mobile device", async () => {
        const MOBILE_WIDTH_PX = 360;
        window.matchMedia = createMatchMedia(MOBILE_WIDTH_PX);

        const applications = generateApplications(3);
        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () => { // Necessary since the component auto mutates its state when loading the rows
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <ApplicationsReviewWidget isMobile={true} />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme });
        });

        for (const application of applications) {
            try {
                const applicationRow = screen.queryByText(application.companyName).closest("tr");
                expect(queryByText(applicationRow, application.companyName)).toBeInTheDocument();
                expect(queryByText(applicationRow, ApplicationStateLabel[application.state])).toBeInTheDocument();

                fireEvent.click(getByLabelText(applicationRow, "More Actions"));

                expect(queryByText(applicationRow.nextElementSibling, format(parseISO(application.submittedAt), "yyyy-MM-dd")))
                    .toBeInTheDocument();
                expect(queryByText(applicationRow.nextElementSibling, application.email)).toBeInTheDocument();

                expect(queryByText(applicationRow.nextElementSibling, application.motivation)).toBeInTheDocument();

                if (application.state === "REJECTED") {
                    expect(queryByText(applicationRow.nextElementSibling, format(parseISO(application.rejectedAt), "yyyy-MM-dd")
                    )).toBeInTheDocument();
                    expect(queryByText(applicationRow.nextElementSibling, application.rejectReason, {
                        normalizer: getDefaultNormalizer({ collapseWhitespace: false }), // Necessary to prevent RTL from collapsing \n
                    })).toBeInTheDocument();
                } else if (application.state === "PENDING") {
                    expect(getByLabelText(applicationRow.nextElementSibling, "Approve Application")).toBeInTheDocument();
                    expect(getByLabelText(applicationRow.nextElementSibling, "Reject Application")).toBeInTheDocument();
                }
            } catch (e) {
                throw new Error(`Failed checking company ${application.companyName}\n\n${e}`);
            }
        }
    });

    it("Should default sort by requestedAt desc and sort rows by company name on click", async () => {
        const applications = generateApplications(10);

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        const sorted5 = applications
            .sort((elem1, elem2) => {
                if (elem2.submittedAt > elem1.submittedAt) {
                    return 1;
                }
                if (elem1.submittedAt > elem2.submittedAt) {
                    return -1;
                }
                return 0;
            })
            .map((a) => a.companyName).slice(0, 5);

        expect((await screen.getAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(2)").textContent)
        ).toStrictEqual(sorted5);


        fireEvent.click(screen.getByRole("button", { name: "Company Name" }));

        const sortByName = applications.map((a) => a.companyName).sort().slice(0, 5);

        expect((await screen.getAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(2)").textContent)
        ).toStrictEqual(sortByName);

    });

    it("Should sort rows by requestedAt", async () => {
        const applications = generateApplications(10);

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        fireEvent.click(screen.getByRole("button", { name: "Requested At" }));

        const sorted5 = applications.map((a) => format(parseISO(a.submittedAt), "yyyy-MM-dd")).sort().slice(0, 5);

        expect((await screen.findAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(3)").textContent)
        ).toStrictEqual(sorted5);


        fireEvent.click(screen.getByRole("button", { name: "Requested At" }));

        const reverseSorted5 = applications.map((a) => format(parseISO(a.submittedAt), "yyyy-MM-dd")).sort((a, b) => {
            if (a === b) return 0; return (a < b) ? 1 : -1;
        }).slice(0, 5);


        expect((await screen.findAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(3)").textContent)
        ).toStrictEqual(reverseSorted5);


    });

    it("Should sort rows by state", async () => {
        const applications = generateApplications(10);

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        fireEvent.click(screen.getByRole("button", { name: "State" }));

        const sorted5 = applications.map((a) => ApplicationStateLabel[a.state]).sort().slice(0, 5);

        expect((await screen.findAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(4)").textContent)
        ).toStrictEqual(sorted5);


        fireEvent.click(screen.getByRole("button", { name: "State" }));

        const reverseSorted5 = applications.map((a) => ApplicationStateLabel[a.state]).sort((a, b) => {
            if (a === b) return 0; return (a < b) ? 1 : -1;
        }).slice(0, 5);


        expect((await screen.findAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(4)").textContent)
        ).toStrictEqual(reverseSorted5);
    });

    it("Should filter by company name", async () => {
        const applications = generateApplications(11);

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        fireEvent.click(screen.getByLabelText("Filter list"));

        fireEvent.change(screen.getByLabelText("Company Name"), { target: { value: "1" } });

        // Since applications are ordered by descending date
        const expectedRes = [...[applications[10].companyName, applications[1].companyName]];

        expect((await screen.findAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(2)").textContent)
        ).toStrictEqual(expectedRes);

    });

    it("Should filter by state", async () => {
        const applications = generateApplications(5);

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        // Open state selector and select approved option
        fireEvent.click(screen.getByLabelText("Filter list"));
        await userEvent.click(screen.getByLabelText("State"));
        fireEvent.click(screen.getByLabelText("Approved"));


        expect((await screen.findAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(2)").textContent)
        ).toStrictEqual(applications.filter((a) => a.state === "APPROVED").sort((elem1, elem2) => {
            if (elem2.submittedAt > elem1.submittedAt) {
                return 1;
            }
            if (elem1.submittedAt > elem2.submittedAt) {
                return -1;
            }
            return 0;
        }).map((a) => a.companyName));


        // Verify it keeps state even if the filters menu is closed (closes state selector and filters menu)
        clickAwayFromFilterMenu();

        // Open state selector and select rejected option
        fireEvent.click(screen.getByLabelText("Filter list"));
        fireEvent.mouseDown(screen.getByLabelText("State", { selector: "div" }));
        fireEvent.click(screen.getByLabelText("Rejected"));


        expect((await screen.findAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(2)").textContent)
        ).toStrictEqual(applications.filter((a) => a.state === "APPROVED" || a.state === "REJECTED")
            .sort((elem1, elem2) => {
                if (elem2.submittedAt > elem1.submittedAt) {
                    return 1;
                }
                if (elem1.submittedAt > elem2.submittedAt) {
                    return -1;
                }
                return 0;
            })
            .map((a) => a.companyName));

        // De-select rejected option and add pending option
        fireEvent.click(screen.getByLabelText("Rejected"));
        fireEvent.click(screen.getByLabelText("Pending"));


        expect((await screen.findAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(2)").textContent)
        ).toStrictEqual(applications.filter((a) => a.state === "APPROVED" || a.state === "PENDING")
            .sort((elem1, elem2) => {
                if (elem2.submittedAt > elem1.submittedAt) {
                    return 1;
                }
                if (elem1.submittedAt > elem2.submittedAt) {
                    return -1;
                }
                return 0;
            })
            .map((a) => a.companyName));


    });

    it("Should filter by date", async () => {
        const applications = generateApplications(5);

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        fireEvent.click(screen.getByLabelText("Filter list"));
        fireEvent.change(screen.getByLabelText("Date From..."), {
            target: {
                value: format(new Date(applications[1].submittedAt), "yyyy-MM-dd"),
            },
        });

        expect((await screen.getAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(2)").textContent)
        ).toStrictEqual(applications.slice(1)
            .sort((elem1, elem2) => {
                if (elem2.submittedAt > elem1.submittedAt) {
                    return 1;
                }
                if (elem1.submittedAt > elem2.submittedAt) {
                    return -1;
                }
                return 0;
            }).
            map((a) => a.companyName));

        fireEvent.change(screen.getByLabelText("Date To..."), {
            target: {
                value:
            format(new Date(applications[3].submittedAt), "yyyy-MM-dd"),
            },
        });

        expect((await screen.getAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(2)").textContent)
        ).toStrictEqual(applications.slice(1, 4)
            .sort((elem1, elem2) => {
                if (elem2.submittedAt > elem1.submittedAt) {
                    return 1;
                }
                if (elem1.submittedAt > elem2.submittedAt) {
                    return -1;
                }
                return 0;
            })
            .map((a) => a.companyName));

        fireEvent.change(screen.getByLabelText("Date From..."), { target: { value: "" } });

        expect((screen.getAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(2)").textContent)
        ).toStrictEqual(applications.slice(0, 4)
            .sort((elem1, elem2) => {
                if (elem2.submittedAt > elem1.submittedAt) {
                    return 1;
                }
                if (elem1.submittedAt > elem2.submittedAt) {
                    return -1;
                }
                return 0;
            })
            .map((a) => a.companyName));
    });

    it("Should reset filters", async () => {
        const applications = generateApplications(5);

        fetch.mockResponse(JSON.stringify({ applications }));

        await act(async () =>
            renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme })
        );

        fireEvent.click(screen.getByLabelText("Filter list"));

        fireEvent.change(screen.getByLabelText("Company Name"), { target: { value: "0" } });

        fireEvent.change(screen.getByLabelText("Date From..."), { target: { value:
            format(new Date(applications[0].submittedAt), "yyyy-MM-dd"),
        } });
        fireEvent.change(screen.getByLabelText("Date To..."), { target: { value:
            format(new Date(applications[0].submittedAt), "yyyy-MM-dd"),
        } });

        await userEvent.click(screen.getByLabelText("State"));
        fireEvent.click(screen.getByLabelText("Approved"));

        // Verify it keeps state even if the filters menu is closed (closes state selector and filters menu)
        clickAwayFromFilterMenu();

        expect(screen.getAllByTestId("application-row")
            .map((el) => el.querySelector("td:nth-child(2)").textContent)
        ).toStrictEqual([applications[0].companyName]);

        fireEvent.click(screen.getByLabelText("Filter list"));

        fireEvent.click(screen.getByLabelText("Reset"));

        expect((await screen.getAllByTestId("application-row"))
            .map((el) => el.querySelector("td:nth-child(2)").textContent)
        ).toStrictEqual(applications
            .sort((elem1, elem2) => {
                if (elem2.submittedAt > elem1.submittedAt) {
                    return 1;
                }
                if (elem1.submittedAt > elem2.submittedAt) {
                    return -1;
                }
                return 0;
            })
            .map((a) => a.companyName));
    });

    it("Should cancel request if unmounted", async () => {

        const abortMock = jest.fn();
        const realAbortController = global.AbortController;
        global.AbortController = class {
            signal = "test-signal"
            abort = abortMock
        };

        let unmountFn;
        await act(async () => {
            const { unmount } = renderWithStoreAndTheme(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <SnackbarProvider maxSnack={3}>
                        <Notifier />
                        <ApplicationsReviewWidget />
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>, { initialState: {}, theme });
            unmountFn = unmount;
        });

        unmountFn();
        expect(abortMock).toHaveBeenCalledTimes(1);

        global.AbortController = realAbortController;
    });
});
