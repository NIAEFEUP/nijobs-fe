import DateFnsUtils from "@date-io/date-fns";
import { createTheme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { fireEvent } from "@testing-library/dom";
import { act } from "@testing-library/react";
import { format } from "date-fns";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useSession from "../../../hooks/useSession";
import useCompany from "../../../hooks/useCompany";
import useComponentController from "../../../hooks/useComponentController";
import { renderWithStoreAndTheme, screen } from "../../../test-utils";
import Company from "../Company";
import EditCompanyProfileForm, { EditCompanyController, EditCompanyControllerContext } from "./EditCompanyProfileForm";

jest.mock("react-router-dom", () => {
    const original = jest.requireActual("react-router-dom");
    return {
        ...original,
        useParams: jest.fn().mockReturnValue({ id: "id1" }),
    };
});
jest.mock("../../../hooks/useSession");
jest.mock("../../../hooks/useCompany");

// eslint-disable-next-line react/prop-types
const EditCompanyWrapper = ({ children }) => {
    const {
        ContextProvider,
        contextProviderProps,
    } = useComponentController(
        EditCompanyController,
        null,
        EditCompanyControllerContext,
    );

    return (
        <ContextProvider {...contextProviderProps}>
            {children}
        </ContextProvider>
    );
};

describe("Edit Company Profile Form", () => {
    afterEach(() => jest.clearAllMocks());

    const company = new Company({
        _id: "id1",
        name: "company",
        bio: "bio",
        contacts: ["contacts@contacts.com", "contacts2@contacts.contacts"],
        hasFinishedRegistration: true,
        isBlocked: false,
        isDisabled: false,
        logo: ""
    });

    console.log("COMPANY IS: ", company);

    const initialState = {};
    const theme = createTheme({});

    describe("It should render form components if company is the correct one", () => {

        it("Should render the form is the user's company is the correct one", () => {
            useSession.mockImplementationOnce(() => ({ company: company }));
            useCompany.mockImplementationOnce(() => ({ "company": company, error: null, loading: false }));

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <EditCompanyWrapper>
                            <EditCompanyProfileForm />
                        </EditCompanyWrapper>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>,
                { initialState, theme }
            );

            expect(screen.getByText("Edit Profile")).toBeVisible();
        })
    });
});
