import React from "react";
import { createTheme } from "@material-ui/core/styles";
import useComponentController from "../../../hooks/useComponentController";
import { BrowserRouter } from "react-router-dom";
import { screen, renderWithStoreAndTheme } from "../../../test-utils";
import useSession from "../../../hooks/useSession";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { searchCities } from "../../../services/locationSearchService";
import { act } from "@testing-library/react";
import { DAY_IN_MS } from "../../../utils/TimeUtils";
import { PAID_OPTIONS } from "../Form/form-components/OfferForm";
import { EditOfferController, EditOfferControllerContext } from "./EditOfferForm";
import EditOfferPage from "../../../pages/EditOfferPage";
import useOffer from "../../../hooks/useOffer";
import Offer from "../../HomePage/SearchResultsArea/Offer/Offer";
import { fireEvent } from "@testing-library/dom";
import JobOptions from "../../utils/offers/JobOptions";
import FieldOptions from "../../utils/offers/FieldOptions";
import TechOptions from "../../utils/offers/TechOptions";

jest.mock("../../../hooks/useOffer");
jest.mock("../../../hooks/useSession");
jest.mock("../../../services/offerService");
jest.mock("../../../services/locationSearchService");

// eslint-disable-next-line react/prop-types
const EditOfferWrapper = ({ children }) => {
    const {
        ContextProvider,
        contextProviderProps,
    } = useComponentController(
        EditOfferController,
        null,
        EditOfferControllerContext,
    );

    return (
        <ContextProvider {...contextProviderProps}>
            {children}
        </ContextProvider>
    );
};

describe("Edit Offer Form", () => {

    const offer = new Offer({
        _id: "id1",
        title: "position1",
        owner: "company_id",
        ownerName: "company1",
        ownerLogo: "",
        vacancies: 10,
        location: "location, location",
        jobType: "SUMMER INTERNSHIP",
        jobStartDate: (new Date()).toISOString(),
        publishDate: "2021-04-22T22:35:57.177Z",
        publishEndDate: "2021-09-19T23:00:00.000Z",
        description: "description1",
        fields: [
            "BLOCKCHAIN",
        ],
        technologies: [
            "Vue",
        ],
        requirements: [
            "requirement1",
            "requirement2",
        ],
        contacts: [
            "contact1",
            "contact2",
        ],
    });

    const initialState = {};
    const theme = createTheme({});

    // it("Should edit description", () => {
    // As of today, it is not possible to test contenteditable elements (such as the awesome description editor)
    // https://github.com/testing-library/dom-testing-library/pull/235

    // If you see this and believe a test is possible to implement now, please do so :)
    // });

    describe("Should render form components", () => {

        it("should render enabled form", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditOfferWrapper>
                            <EditOfferPage />
                        </EditOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            expect(screen.getByLabelText("Offer Title")).toBeEnabled();
            expect(screen.getByLabelText("Location")).toBeEnabled();
            expect(screen.getByLabelText("Job Type")).not.toHaveAttribute("aria-disabled");
            expect(screen.getByLabelText("Fields")).toBeEnabled();
            expect(screen.getByLabelText("Technologies")).toBeEnabled();
            expect(screen.getByLabelText("Location")).toBeEnabled();
            expect(screen.getByLabelText("Job Start Date")).toBeEnabled();
            expect(screen.getByLabelText("Vacancies")).toBeEnabled();
            expect(screen.getByLabelText("Compensation")).not.toHaveAttribute("aria-disabled");
            expect(screen.getByLabelText("Publication Date")).toBeEnabled();
            expect(screen.getByLabelText("Publication End Date")).toBeEnabled();
            expect(screen.getByTestId("contacts-selector")).toBeEnabled();
            expect(screen.getByTestId("requirements-selector")).toBeEnabled();
            expect(screen.getByText("Submit").parentNode).toBeEnabled();
        });

        it("should have offer values", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditOfferWrapper>
                            <EditOfferPage />
                        </EditOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            expect(screen.getByLabelText("Offer Title").getAttribute("value")).toBe(offer.title);
            expect(screen.getByLabelText("Location").getAttribute("value")).toBe(offer.location);
            expect(screen.findByText(JobOptions[offer.jobType]));
            expect(screen.getByLabelText("Vacancies").getAttribute("value")).toBe((offer.vacancies.toString()));
            expect(screen.getByLabelText("Compensation").getAttribute("value")).toBe(null);
            offer.fields.forEach((field) => screen.findByText(FieldOptions[field]));
            offer.technologies.forEach((tech) => screen.findByText(TechOptions[tech]));
            offer.requirements.forEach((requirement) => expect(screen.getByDisplayValue(requirement)).toBeInTheDocument());
            offer.contacts.forEach((contact) => expect(screen.getByDisplayValue(contact)).toBeInTheDocument());
        });

        it("should not be visible advanced settings", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditOfferWrapper>
                            <EditOfferPage />
                        </EditOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            expect(screen.queryByText("Publication Date")).not.toBeVisible();
            expect(screen.queryByText("Publication End Date")).not.toBeVisible();
        });

        it("should be visible advanced settings after clicking the button", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditOfferWrapper>
                            <EditOfferPage />
                        </EditOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            await fireEvent.click(screen.getByText("Advanced Settings"));

            expect(screen.getByText("Publication Date")).toBeVisible();
            expect(screen.getByText("Publication End Date")).toBeVisible();
        });
    });


    describe("Should validate Form", () => {
        it("should fail validation if empty title", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditOfferWrapper>
                            <EditOfferPage />
                        </EditOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByLabelText("Offer Title");
            fireEvent.change(input, { target: { value: "" } });
            fireEvent.focus(input);
            fireEvent.blur(input);

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("0/90 Required field.");

            const offerTitle = "An Offer Title";

            fireEvent.change(input, { target: { value: offerTitle } });
            fireEvent.blur(input);

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent(`${offerTitle.length}/90`);

        });

        it("should fail validation if empty location", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditOfferWrapper>
                            <EditOfferPage />
                        </EditOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByLabelText("Location");
            await fireEvent.change(input, { target: { value: "" } });

            fireEvent.focus(input);
            fireEvent.blur(input);

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("Required field.");
        });

        it("should fail validation if locations not following the regex", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            searchCities.mockImplementation(() => Promise.resolve({ city: "asd", country: "asd" }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditOfferWrapper>
                            <EditOfferPage />
                        </EditOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByLabelText("Location");

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

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Location"))).toHaveTextContent("\u200B");
        });

        it("should fail validation if fields empty", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditOfferWrapper>
                            <EditOfferPage />
                        </EditOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const input = screen.getByLabelText("Fields");
            fireEvent.focus(input);
            fireEvent.blur(input);

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("Must have at least 2 option(s)");
        });

        it("should allow only numbers in vacancies", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditOfferWrapper>
                            <EditOfferPage />
                        </EditOfferWrapper>
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
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditOfferWrapper>
                            <EditOfferPage />
                        </EditOfferWrapper>
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
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditOfferWrapper>
                            <EditOfferPage />
                        </EditOfferWrapper>
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

        it("should be visible advanced settings if form error in these publication date", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditOfferWrapper>
                            <EditOfferPage />
                        </EditOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const pubDateInput = screen.getByLabelText("Publication Date");

            await act(async () => {
                await fireEvent.focus(pubDateInput);
                await fireEvent.change(pubDateInput, { target: { value: "12" } });
                await fireEvent.blur(pubDateInput);
            });

            expect(await wrapper.findDescriptionOf(pubDateInput)).toHaveTextContent("Must be a valid ISO8601 date.");


            expect(screen.queryByText("Publication Date")).toBeVisible();
            expect(screen.queryByText("Publication End Date")).toBeVisible();
        });

        it("should be visible advanced settings if form error in these publication end date", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditOfferWrapper>
                            <EditOfferPage />
                        </EditOfferWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            const pubDateInput = screen.getByLabelText("Publication End Date");

            await act(async () => {
                await fireEvent.focus(pubDateInput);
                await fireEvent.change(pubDateInput, { target: { value: "12" } });
                await fireEvent.blur(pubDateInput);
            });

            expect(await wrapper.findDescriptionOf(pubDateInput)).toHaveTextContent("Must be a valid ISO8601 date.");


            expect(screen.queryByText("Publication Date")).toBeVisible();
            expect(screen.queryByText("Publication End Date")).toBeVisible();
        });
    });
});
