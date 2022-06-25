import React from "react";
import { createTheme } from "@material-ui/core/styles";
import useComponentController from "../../../hooks/useComponentController";
import { CreateOfferController, CreateOfferControllerContext } from "./CreateOfferForm";
import { BrowserRouter } from "react-router-dom";
import { screen, fireEvent, renderWithStoreAndTheme } from "../../../test-utils";
import useSession from "../../../hooks/useSession";
import CreateOfferPage from "../../../pages/CreateOfferPage";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { searchCities } from "../../../services/locationSearchService";
import { act } from "@testing-library/react";
import { DAY_IN_MS } from "../../../utils/TimeUtils";
import { PAID_OPTIONS } from "../Form/form-components/OfferForm";

jest.mock("../../../hooks/useSession");
jest.mock("../../../services/locationSearchService");

// eslint-disable-next-line react/prop-types
const CreateOfferWrapper = ({ children }) => {
    const {
        ContextProvider,
        contextProviderProps,
    } = useComponentController(
        CreateOfferController,
        null,
        CreateOfferControllerContext
    );

    return (
        <ContextProvider {...contextProviderProps}>
            {children}
        </ContextProvider>
    );
};

describe("Create Offer Form", () => {

    const initialState = {};
    const theme = createTheme({});

    // it("Should edit description", () => {
    // As of today, it is not possible to test contenteditable elements (such as the awesome description editor)
    // https://github.com/testing-library/dom-testing-library/pull/235

    // If you see this and believe a test is possible to implement now, please do so :)
    // });

    describe("Should render form components", () => {
        it("should render alert and disable form elements if not logged in", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: false }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            expect(screen.getByText("Login")).toBeInTheDocument();
            expect(screen.getByText("Join us")).toBeInTheDocument();

            expect(screen.getByLabelText("Offer Title *")).toBeDisabled();
            expect(screen.getByLabelText("Location *")).toBeDisabled();
            expect(screen.getByLabelText("Job Type *")).toHaveAttribute("aria-disabled", "true");
            expect(screen.getByLabelText("Fields *")).toBeDisabled();
            expect(screen.getByLabelText("Technologies *")).toBeDisabled();
            expect(screen.getByLabelText("Job Start Date")).toBeDisabled();
            expect(screen.getByLabelText("Vacancies")).toBeDisabled();
            expect(screen.getByLabelText("Compensation")).toHaveAttribute("aria-disabled", "true");
            expect(screen.getByLabelText("Publication Date *")).toBeDisabled();
            expect(screen.getByLabelText("Publication End Date *")).toBeDisabled();
            expect(screen.getByTestId("contacts-selector")).toBeDisabled();
            expect(screen.getByTestId("requirements-selector")).toBeDisabled();
            expect(screen.getByText("Submit").parentNode).toBeDisabled();
        });

        it("should render owner id text field if admin logged in", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { email: "admin@admin.com", isAdmin: true } }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );


            expect(screen.queryByText("Login")).not.toBeInTheDocument();
            expect(screen.queryByText("Join us")).not.toBeInTheDocument();
            expect(screen.queryByLabelText("Owner ID *")).toBeInTheDocument();
        });

        it("should not render owner id text field if company logged in", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );


            expect(screen.queryByText("Login")).not.toBeInTheDocument();
            expect(screen.queryByText("Join us")).not.toBeInTheDocument();
            expect(screen.queryByLabelText("Owner ID *")).not.toBeInTheDocument();
        });

        it("should render enabled form", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            expect(screen.getByLabelText("Offer Title *")).toBeEnabled();
            expect(screen.getByLabelText("Location *")).toBeEnabled();
            expect(screen.getByLabelText("Job Type *")).not.toHaveAttribute("aria-disabled");
            expect(screen.getByLabelText("Fields *")).toBeEnabled();
            expect(screen.getByLabelText("Technologies *")).toBeEnabled();
            expect(screen.getByLabelText("Job Start Date")).toBeEnabled();
            expect(screen.getByLabelText("Vacancies")).toBeEnabled();
            expect(screen.getByLabelText("Compensation")).not.toHaveAttribute("aria-disabled");
            expect(screen.getByLabelText("Publication Date *")).toBeEnabled();
            expect(screen.getByLabelText("Publication End Date *")).toBeEnabled();
            expect(screen.getByLabelText("Hide offer")).toBeEnabled();
            expect(screen.getByTestId("contacts-selector")).toBeEnabled();
            expect(screen.getByTestId("requirements-selector")).toBeEnabled();
            expect(screen.getByLabelText("Application URL")).toBeEnabled();
            expect(screen.getByText("Submit").parentNode).toBeEnabled();
        });

        it("should not be visible advanced settings", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            expect(screen.queryByText("Publication Date *")).not.toBeVisible();
            expect(screen.queryByText("Publication End Date *")).not.toBeVisible();
            expect(screen.queryByText("Hide offer")).not.toBeVisible();
        });

        it("should be visible advanced settings after clicking the button", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            await fireEvent.click(screen.getByText("Advanced Settings"));

            expect(screen.queryByText("Publication Date *")).toBeVisible();
            expect(screen.queryByText("Publication End Date *")).toBeVisible();
            expect(screen.queryByText("Hide offer")).toBeVisible();
        });

        it("should not have job type options with null value", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            await act(async () => {
                const button = await screen.findByLabelText("Job Type *");
                fireEvent.mouseDown(button);
            });

            const elements = await screen.findAllByTestId("job-type-item");
            elements.forEach((element) => {
                expect(element).toHaveAttribute("data-value");
                expect(element).toBeVisible();
            });
        });
    });

    describe("Should validate Form", () => {
        it("should fail validation if empty title", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByLabelText("Offer Title *");
            fireEvent.focus(input);
            fireEvent.blur(input);

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("0/90 Required field.");

            const offerTitle = "An Offer Title";

            fireEvent.change(input, { target: { value: offerTitle } });
            fireEvent.blur(input);

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent(`${offerTitle.length}/90`);

        });


        it("should fail validation if empty location", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByLabelText("Location *");
            fireEvent.focus(input);
            fireEvent.blur(input);

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("Required field.");


        });


        it("should fail validation if locations not following the regex", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));
            searchCities.mockImplementation(() => Promise.resolve({ city: "asd", country: "asd" }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByLabelText("Location *");

            await act(async () => {
                await fireEvent.focus(input);
                await fireEvent.change(input, { target: { value: "invalid" } });
                await fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(input))
                .toHaveTextContent("The location format must be <city>, <country>. Beware of extra spaces.");

            await act(async () =>  {
                await fireEvent.change(input, { target: { value: "city, country" } });
                await fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Location *"))).toHaveTextContent("\u200B");
        });

        it("should fail validation if fields empty", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByLabelText("Fields *");
            fireEvent.focus(input);
            fireEvent.blur(input);

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("Must have at least 1 option");
        });

        it("should fail validation if fields not minimum size", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByLabelText("Fields *");
            await act(async () => {
                await fireEvent.mouseDown(input);
                await fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("Must have at least 1 option");

            await act(async () => {
                await fireEvent.mouseDown(input);
                await fireEvent.click(screen.getByText("Front-End"));
                await fireEvent.blur(input);
            });


            expect(screen.getByText("Front-End")).toBeInTheDocument();

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("\u200B");
        });

        it("should fail validation if techs empty", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            // Should work with label but somehow it wasn't being targeted
            const input = screen.getByTestId("tech-selector");

            await act(async () => {

                await fireEvent.focus(input);
                await fireEvent.blur(input);

            });


            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("Must have at least 1 option(s)");
        });

        it("should fail validation if techs not minimum size", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByTestId("tech-selector");
            fireEvent.mouseDown(input);

            fireEvent.click(screen.getByText("React"));
            fireEvent.blur(input);
            expect(screen.getByText("React")).toBeInTheDocument();

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("\u200B");
        });

        it("should allow only numbers in vacancies", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByLabelText("Vacancies");
            fireEvent.focus(input);

            fireEvent.change(input, { target: { value: "aaa" } });
            fireEvent.blur(input);

            expect(input.value).toBe("");

            fireEvent.change(input, { target: { value: "1723" } });
            fireEvent.blur(input);

            expect(input.value).toBe("1723");

        });

        it("should fail validation if invalid jobStartDate", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByLabelText("Job Start Date");
            fireEvent.focus(input);

            fireEvent.change(input, { target: { value: "12" } });
            fireEvent.blur(input);

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("Must be a valid ISO8601 date.");

            await act (async () => {
                await fireEvent.focus(input);
                await fireEvent.change(input, { target: { value: format(Date.now() - DAY_IN_MS, "yyyyMMdd") } });
                await fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("Date must not be in the past.");


            await act (async () => {
                await fireEvent.focus(input);
                await fireEvent.change(input, { target: { value: format(Date.now(), "yyyyMMdd") } });
                await fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("\u200B");

        });

        it("should allow any compensation value", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            /* When using TextField as a selector, there will be the selector
             div (which has the label) and its sibling is the actual input
             with the value
            */
            const selector = screen.getByLabelText("Compensation");
            const input = selector.nextElementSibling;

            for (const { value, label } of PAID_OPTIONS) {
                await act(async () => {
                    await fireEvent.mouseDown(selector);
                });

                if (value === "none") {
                    expect(screen.getAllByText(label)[1]).toBeInTheDocument();
                } else {
                    expect(screen.getByText(label)).toBeInTheDocument();
                }

                await act(async () => {
                    if (value === "none") {
                        await fireEvent.click(screen.getAllByText(label)[1]);
                    } else {
                        await fireEvent.click(screen.getByText(label));
                    }
                    await fireEvent.blur(selector);
                });

                if (value === "none")
                    expect(input.value).toBe("none");
                else
                    expect(input.value).toBe(JSON.stringify(value));
            }

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("\u200B");
        });

        it("should fail validation if invalid publishDate", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByLabelText("Publication Date *");
            fireEvent.focus(input);

            fireEvent.change(input, { target: { value: "12" } });
            fireEvent.blur(input);

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("Must be a valid ISO8601 date.");

            await act (async () => {
                await fireEvent.focus(input);
                await fireEvent.change(input, { target: { value: format(Date.now() - DAY_IN_MS, "yyyyMMdd") } });
                await fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("Date must not be in the past.");


            await act (async () => {
                await fireEvent.focus(input);
                await fireEvent.change(input, { target: { value: format(Date.now(), "yyyyMMdd") } });
                await fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("\u200B");

        });

        it("should fail validation if invalid publishEndDate", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByLabelText("Publication End Date *");
            fireEvent.focus(input);

            fireEvent.change(input, { target: { value: "12" } });
            fireEvent.blur(input);

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("Must be a valid ISO8601 date.");

            await act (async () => {
                await fireEvent.focus(input);
                await fireEvent.change(input, { target: { value: format(Date.now() - DAY_IN_MS, "yyyyMMdd") } });
                await fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("Date must not be in the past.");


            await act (async () => {
                const publishDateInput = screen.getByLabelText("Publication Date *");
                await fireEvent.focus(publishDateInput);
                await fireEvent.change(publishDateInput, { target: { value: format(Date.now() + (2 * DAY_IN_MS), "yyyyMMdd") } });
                await fireEvent.blur(publishDateInput);


                await fireEvent.focus(input);
                await fireEvent.change(input, { target: { value: format(Date.now() + DAY_IN_MS, "yyyyMMdd") } });
                await fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(input))
                .toHaveTextContent("Publication end date should be after Publish Date but not over 6 month(s) after that.");


            await act (async () => {
                await fireEvent.focus(input);
                await fireEvent.change(input, { target: { value: format(Date.now() + (3 * DAY_IN_MS), "yyyyMMdd") } });
                await fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("\u200B");

        });

        it("should be visible advanced settings if form error in these publication date", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const pubDateInput = screen.getByLabelText("Publication Date *");

            await act(async () => {
                await fireEvent.focus(pubDateInput);
                await fireEvent.change(pubDateInput, { target: { value: "12" } });
                await fireEvent.blur(pubDateInput);
            });

            expect(await wrapper.findDescriptionOf(pubDateInput)).toHaveTextContent("Must be a valid ISO8601 date.");


            expect(screen.queryByText("Publication Date *")).toBeVisible();
            expect(screen.queryByText("Publication End Date *")).toBeVisible();
            expect(screen.queryByText("Hide offer")).toBeVisible();
        });

        it("should be visible advanced settings if form error in these publication end date", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CreateOfferWrapper>
                            <CreateOfferPage />
                        </CreateOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const pubDateInput = screen.getByLabelText("Publication End Date *");

            await act(async () => {
                await fireEvent.focus(pubDateInput);
                await fireEvent.change(pubDateInput, { target: { value: "12" } });
                await fireEvent.blur(pubDateInput);
            });

            expect(await wrapper.findDescriptionOf(pubDateInput)).toHaveTextContent("Must be a valid ISO8601 date.");


            expect(screen.queryByText("Publication Date *")).toBeVisible();
            expect(screen.queryByText("Publication End Date *")).toBeVisible();
            expect(screen.queryByText("Hide offer")).toBeVisible();
        });
    });
});
