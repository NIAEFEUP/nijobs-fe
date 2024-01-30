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

jest.mock("../../../hooks/useCompany");
jest.mock("react-router-dom", () => {
    const original = jest.requireActual("react-router-dom");
    return {
        ...original,
        useParams: jest.fn().mockReturnValue({ id: "id1" }),
    };
});
jest.mock("../../../hooks/useSession");
jest.mock("../../../services/locationSearchService");

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

    const initialState = {};
    const theme = createTheme({});

    describe("Should render form components if company is the correct one", () => {

        it("Should render the form if the user's company is the correct one", () => {
            useSession.mockImplementationOnce(() => ({ company: company }));
            useCompany.mockImplementationOnce(() => { return { company: company }; });

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <Switch>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <EditCompanyWrapper>
                                <EditCompanyProfileForm />
                            </EditCompanyWrapper>
                        </MuiPickersUtilsProvider>
                    </Switch>
                </BrowserRouter>,
                { initialState, theme }
            );

            expect(screen.getByText("Edit Profile")).toBeVisible();
        })
    });
});
