import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import HomePage from "./HomePage";
import { renderWithStoreAndTheme, screen, fireEvent } from "../test-utils";
import useSession from "../hooks/useSession";
import AppTheme from "../AppTheme";
import { SnackbarProvider } from "notistack";
import Notifier from "../components/Notifications/Notifier";

import qs from "qs";

jest.mock("../hooks/useSession");

describe("HomePage", () => {
    const initialState = {
        offerSearch: {
            offers: [],
            searchValue: "searchValue",
            jobDuration: [1, 2],
            fields: [],
            technologies: [],
        },
        navbar: {
            showAuthModal: false,
        },
    };
    useSession.mockImplementation(() => ({ isLoggedIn: false, revalidate: () => { } }));

    describe("render", () => {

        it("should render search area and info message", () => {

            renderWithStoreAndTheme(
                <Router>
                    <HomePage />
                </Router>,
                { initialState, theme: AppTheme }
            );

            expect(screen.getByLabelText("Search Area")).toBeInTheDocument();
            expect(screen.getByText("Your next opportunity is out there. Use the search bar to find it!")).toBeInTheDocument();
        });

    });

    describe("interaction", () => {
        it("should render search results after search submission", () => {

            // Simulate search request success
            fetch.mockResponse(JSON.stringify({ mockData: true }));

            // Currently jsdom does not know about scrollIntoView function, and thus, the code will break when submitting search
            // As a workaround, a stub is defined below, just for the code to not throw the error and actually test what matters
            const scrollMock = jest.fn();
            window.HTMLElement.prototype.scrollIntoView = scrollMock;

            renderWithStoreAndTheme(
                <Router>
                    <HomePage />
                </Router>,
                { initialState, theme: AppTheme }
            );

            fireEvent.click(screen.getByRole("button", { name: "Search" }));

            expect(screen.getByTestId("Search Results Widget")).toBeInTheDocument();
            expect(scrollMock).toHaveBeenCalled();
        });
    });

    describe("Application Messages", () => {
        it("should show finish registration notification", async () => {

            useSession.mockImplementation(() => ({
                isLoggedIn: true,
                data: { company: { hasFinishedRegistration: false } },
                revalidate: () => { },
            }));

            renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <Notifier />
                    <Router>
                        <HomePage />
                    </Router>
                </SnackbarProvider>,
                { initialState, theme: AppTheme }
            );

            expect(await screen.findByText("In order to fully use NIJobs, you still need to finish your registration."))
                .toBeInTheDocument();
        });

        it("should not show finish registration notification", () => {

            useSession.mockImplementation(() => ({
                isLoggedIn: true,
                data: { company: { hasFinishedRegistration: true } },
                revalidate: () => { },
            }));

            renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <Notifier />
                    <Router>
                        <HomePage />
                    </Router>
                </SnackbarProvider>,
                { initialState, theme: AppTheme }
            );

            expect(screen.queryByText("In order to fully use NIJobs, you still need to finish your registration."))
                .not.toBeInTheDocument();
        });
    });

    describe("URL Search Params", () => {

        test("Should auto-submit if valid search params present in the URL location", () => {

            const params = {
                searchValue: "test-search-value",
                jobMinDuration: 2,
                jobMaxDuration: 9,
                fields: ["TEST-FIELD1", "TEST-FIELD2"],
                technologies: ["TEST-TECH"],
                jobType: "test-job-type",
            };

            const locationSearch = `?${qs.stringify(params, { skipNulls: true, arrayFormat: "brackets" })}`;

            let submitted = false;

            fetch.mockImplementation(() => {
                submitted = true;

                return { mockData: true };
            });

            renderWithStoreAndTheme(
                <Router initialEntries={[`/${locationSearch}`]}>
                    <HomePage />
                </Router>,
                { initialState, theme: AppTheme }
            );

            expect(submitted).toBe(true);
        });

        test("Should auto-submit if one valid search param present in the URL location", () => {

            const params = {
                searchValue: "test-search-value",
                jobMinDurationr: 2,
                jobMaxDurationy: 9,
                fieldsu: ["TEST-FIELD1", "TEST-FIELD2"],
                technologiest: ["TEST-TECH"],
                jobTypeh: "test-job-type",
            };

            const locationSearch = `?${qs.stringify(params, { skipNulls: true, arrayFormat: "brackets" })}`;

            let submitted = false;

            fetch.mockImplementation(() => {
                submitted = true;

                return { mockData: true };
            });

            renderWithStoreAndTheme(
                <Router initialEntries={[`/${locationSearch}`]}>
                    <HomePage />
                </Router>,
                { initialState, theme: AppTheme }
            );

            expect(submitted).toBe(true);
        });

        test("Should not auto-submit if no valid search params present in the URL location", () => {

            const params = {
                searchValuez: "test-search-value",
                jobMinDurationr: 2,
                jobMaxDurationy: 9,
                fieldsu: ["TEST-FIELD1", "TEST-FIELD2"],
                technologiest: ["TEST-TECH"],
                jobTypeh: "test-job-type",
            };

            const locationSearch = `?${qs.stringify(params, { skipNulls: true, arrayFormat: "brackets" })}`;

            let submitted = false;

            fetch.mockImplementation(() => {
                submitted = true;

                return { mockData: true };
            });

            renderWithStoreAndTheme(
                <Router initialEntries={[`/${locationSearch}`]}>
                    <HomePage />
                </Router>,
                { initialState, theme: AppTheme }
            );

            expect(submitted).toBe(false);
        });

    });
});
