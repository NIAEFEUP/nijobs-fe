import DateFnsUtils from "@date-io/date-fns";
import { createTheme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { fireEvent } from "@testing-library/dom";
import { act } from "@testing-library/react";
import { format } from "date-fns";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import useComponentController from "../../../hooks/useComponentController";
import useOffer from "../../../hooks/useOffer";
import useSession from "../../../hooks/useSession";
import EditOfferPage from "../../../pages/EditOfferPage";
import { renderWithStoreAndTheme, screen } from "../../../test-utils";
import { HumanValidationReasons } from "../../../utils";
import { DAY_IN_MS, MONTH_IN_MS } from "../../../utils/TimeUtils";
import Offer from "../../HomePage/SearchResultsArea/Offer/Offer";
import FieldOptions from "../../utils/offers/FieldOptions";
import JobOptions from "../../utils/offers/JobOptions";
import TechOptions from "../../utils/offers/TechOptions";
import { PAID_OPTIONS } from "../Form/form-components/OfferForm";
import { EditOfferController, EditOfferControllerContext } from "./EditOfferForm";

jest.mock("../../../hooks/useOffer");
jest.mock("react-router-dom", () => {
    const original = jest.requireActual("react-router-dom");
    return {
        ...original,
        useParams: jest.fn().mockReturnValue({ id: "test123" }),
    };
});
jest.mock("../../../hooks/useSession");
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

    afterEach(() => jest.clearAllMocks());

    const offer = new Offer({
        _id: "id1",
        title: "position1",
        owner: "company_id",
        ownerName: "company1",
        ownerLogo: "",
        vacancies: 10,
        location: "location, location",
        jobType: "SUMMER INTERNSHIP",
        jobMinDuration: 2,
        jobMaxDuration: 4,
        jobStartDate: (new Date(Date.now() + (MONTH_IN_MS * 3))).toISOString(),
        publishDate: (new Date(Date.now())).toISOString(),
        publishEndDate: (new Date(Date.now() + (MONTH_IN_MS * 2))).toISOString(),
        description: "description1",
        fields: [
            "BLOCKCHAIN",
            "BACKEND",
        ],
        technologies: [
            "VueJS",
        ],
        requirements: [
            "requirement1",
            "requirement2",
        ],
        contacts: [
            "contact1",
            "contact2",
        ],
        isPaid: null,
        applyURL: "https://www.test.com",
    });

    const initialState = {};
    const theme = createTheme({});

    // it("Should edit description", () => {
    // As of today, it is not possible to test contenteditable elements (such as the awesome description editor)
    // https://github.com/testing-library/dom-testing-library/pull/235

    // If you see this and believe a test is possible to implement now, please do so :)
    // });

    describe("Should render form components", () => {

        it("should be redirected to home if not logged in", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: false }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            key="/"
                        >
                            <div>
                                Test Redirect
                            </div>
                        </Route>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <EditOfferWrapper>
                                <EditOfferPage />
                            </EditOfferWrapper>
                        </MuiPickersUtilsProvider>
                    </Switch>
                </BrowserRouter>,
                { initialState, theme }
            );

            expect(screen.findByText("Test Redirect"));
        });

        it("should be redirected to home if offer does not exist", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: true, mutate: () => {} }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            key="/"
                        >
                            <div>
                                Test Redirect
                            </div>
                        </Route>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <EditOfferWrapper>
                                <EditOfferPage />
                            </EditOfferWrapper>
                        </MuiPickersUtilsProvider>
                    </Switch>
                </BrowserRouter>,
                { initialState, theme }
            );

            expect(screen.findByText("Test Redirect"));
        });

        it("should be redirected to home if company not owner", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "other_company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: true, mutate: () => {} }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            key="/"
                        >
                            <div>
                                Test Redirect
                            </div>
                        </Route>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <EditOfferWrapper>
                                <EditOfferPage />
                            </EditOfferWrapper>
                        </MuiPickersUtilsProvider>
                    </Switch>
                </BrowserRouter>,
                { initialState, theme }
            );

            expect(screen.findByText("Test Redirect"));
        });
        it("should show circular progress bar while data is being fetch", () => {
            useSession.mockImplementation(() => ({ isValidating: true, isLoggedIn: true, data: { company: { _id: "company_id" } } }));
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
            expect(screen.queryByRole("progressbar")).toBeInTheDocument();

        });

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

            expect(screen.getByLabelText("Offer Title *")).toBeEnabled();
            expect(screen.getByLabelText("Location *")).toBeEnabled();
            expect(screen.getByLabelText("Job Type *")).not.toHaveAttribute("aria-disabled");
            expect(screen.getByLabelText("Fields *")).toBeEnabled();
            expect(screen.getByLabelText("Technologies *")).toBeEnabled();
            expect(screen.getByLabelText("Location *")).toBeEnabled();
            expect(screen.getByLabelText("Job Start Date")).toBeEnabled();
            expect(screen.getByLabelText("Vacancies")).toBeEnabled();
            expect(screen.getByLabelText("Compensation")).not.toHaveAttribute("aria-disabled");
            expect(screen.getByLabelText("Publication Date *")).toBeEnabled();
            expect(screen.getByLabelText("Publication End Date *")).toBeEnabled();
            expect(screen.getByTestId("contacts-selector")).toBeEnabled();
            expect(screen.getByTestId("requirements-selector")).toBeEnabled();
            expect(screen.getByLabelText("Application URL")).toBeEnabled();
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

            expect(screen.getByLabelText("Offer Title *").getAttribute("value")).toBe(offer.title);
            expect(screen.getByLabelText("Location *").getAttribute("value")).toBe(offer.location);
            expect(screen.findByText(JobOptions.find(({ value }) => value === offer.jobType).label));
            expect(screen.getByLabelText("Vacancies").getAttribute("value")).toBe((offer.vacancies.toString()));
            expect(screen.getByLabelText("Compensation").getAttribute("value")).toBe(null);
            offer.fields.forEach((field) => screen.findByText(FieldOptions[field]));
            offer.technologies.forEach((tech) => screen.findByText(TechOptions[tech]));
            offer.requirements.forEach((requirement) => expect(screen.getByDisplayValue(requirement)).toBeInTheDocument());
            offer.contacts.forEach((contact) => expect(screen.getByDisplayValue(contact)).toBeInTheDocument());
            expect(screen.getByLabelText("Application URL").getAttribute("value")).toBe(offer.applyURL);
        });


        it("should not submit dates if not edited", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));
            fetch.mockResponse(JSON.stringify(offer));

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

            const submit = screen.getByTestId("submit-offer");

            expect(submit).toBeEnabled();

            await act(async () => {
                await fireEvent.click(submit);
            });

            const {
                title,
                jobMinDuration,
                jobMaxDuration,
                jobStartDate,
                description,
                contacts,
                isPaid,
                vacancies,
                jobType,
                fields,
                technologies,
                location,
                requirements,
                applyURL,
            } = offer;

            expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/.*\/offers\/edit\/test123/), expect.objectContaining({
                body: JSON.stringify({
                    title,
                    jobMinDuration,
                    jobMaxDuration,
                    jobStartDate,
                    description,
                    contacts,
                    isPaid,
                    vacancies,
                    jobType,
                    fields,
                    technologies,
                    location,
                    requirements,
                    applyURL,
                }),
            }));

        });

        it("should submit dates if edited", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { _id: "company_id" } } }));
            useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));
            fetch.mockResponse(JSON.stringify(offer));

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

            const publishDateInput = screen.getByLabelText("Publication Date *");
            const publishEndDateInput = screen.getByLabelText("Publication End Date *");

            const newPublishDate = new Date(Date.now() + (2 * DAY_IN_MS));
            const newPublishEndDate = new Date(Date.now() + (3 * DAY_IN_MS));

            await act(() => {
                fireEvent.focus(publishDateInput);
                fireEvent.change(publishDateInput, { target: { value: format(newPublishDate, "yyyyMMdd") } });
                fireEvent.blur(publishDateInput);

                fireEvent.focus(publishEndDateInput);
                fireEvent.change(publishEndDateInput, { target: { value: format(newPublishEndDate, "yyyyMMdd") } });
                fireEvent.blur(publishEndDateInput);
            });


            const submit = screen.getByTestId("submit-offer");

            expect(submit).toBeEnabled();

            await act(async () => {
                await fireEvent.click(submit);
            });

            const {
                title,
                jobMinDuration,
                jobMaxDuration,
                jobStartDate,
                description,
                contacts,
                isPaid,
                vacancies,
                jobType,
                fields,
                technologies,
                location,
                requirements,
                applyURL,
            } = offer;


            expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/.*\/offers\/edit\/test123/), expect.objectContaining({
                body: JSON.stringify({
                    title,
                    publishDate: new Date(newPublishDate.setHours(0, 0, 0, 0)).toISOString(),
                    publishEndDate: new Date(newPublishEndDate.setHours(23, 59, 59, 0)).toISOString(),
                    jobMinDuration,
                    jobMaxDuration,
                    jobStartDate,
                    description,
                    contacts,
                    isPaid,
                    vacancies,
                    jobType,
                    fields,
                    technologies,
                    location,
                    requirements,
                    applyURL,
                }),
            }));

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

            const input = screen.getByLabelText("Offer Title *");

            await act(() => {
                fireEvent.change(input, { target: { value: "" } });
                fireEvent.focus(input);
                fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("0/90 Required field.");

            const offerTitle = "An Offer Title *";

            await act(() => {
                fireEvent.change(input, { target: { value: offerTitle } });
                fireEvent.blur(input);
            });

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

            const input = screen.getByLabelText("Location *");

            await act(() => {
                fireEvent.change(input, { target: { value: "" } });
                fireEvent.focus(input);
                fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(input)).toHaveTextContent("Required field.");
        });

        it("should allow only numbers in vacancies", async () => {
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

            await act(() => {
                fireEvent.focus(input);

                fireEvent.change(input, { target: { value: "aaa" } });
                fireEvent.blur(input);
            });

            expect(input.value).toBe("");

            await act(() => {
                fireEvent.change(input, { target: { value: "1723" } });
                fireEvent.blur(input);
            });

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

            await act(() => {
                fireEvent.focus(input);

                fireEvent.change(input, { target: { value: "12" } });
                fireEvent.blur(input);
            });

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

        it("should fail validation if applyURL not following the regex", async () => {
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

            const input = screen.getByLabelText("Application URL");

            await act(() => {
                fireEvent.focus(input);
                fireEvent.change(input, { target: { value: "invalid" } });
                fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(input))
                .toHaveTextContent(HumanValidationReasons.BAD_APPLY_URL);

            await act(() =>  {
                fireEvent.change(input, { target: { value: "https://valid.com" } });
                fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Application URL")))
                .not.toHaveTextContent(HumanValidationReasons.BAD_APPLY_URL);

            await act(() => {
                fireEvent.change(input, { target: { value: "valid@email.com" } });
                fireEvent.blur(input);
            });

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Application URL")))
                .not.toHaveTextContent(HumanValidationReasons.BAD_APPLY_URL);
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

            const pubDateInput = screen.getByLabelText("Publication Date *");

            await act(async () => {
                await fireEvent.focus(pubDateInput);
                await fireEvent.change(pubDateInput, { target: { value: "12" } });
                await fireEvent.blur(pubDateInput);
            });

            expect(await wrapper.findDescriptionOf(pubDateInput)).toHaveTextContent("Must be a valid ISO8601 date.");


            expect(screen.queryByText("Publication Date *")).toBeVisible();
            expect(screen.queryByText("Publication End Date *")).toBeVisible();
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

            const pubDateInput = screen.getByLabelText("Publication End Date *");

            await act(async () => {
                await fireEvent.focus(pubDateInput);
                await fireEvent.change(pubDateInput, { target: { value: "12" } });
                await fireEvent.blur(pubDateInput);
            });

            expect(await wrapper.findDescriptionOf(pubDateInput)).toHaveTextContent("Must be a valid ISO8601 date.");


            expect(screen.queryByText("Publication Date *")).toBeVisible();
            expect(screen.queryByText("Publication End Date *")).toBeVisible();
        });
    });
});
