import React from "react";
import { createTheme } from "@material-ui/core/styles";
import useComponentController from "../../../hooks/useComponentController";
import CreateOfferForm, { CreateOfferController, CreateOfferControllerContext } from "./CreateOfferForm";
import { BrowserRouter } from "react-router-dom";
import { renderWithTheme, screen, fireEvent } from "../../../test-utils";

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

    // it("Should edit description", () => {
    // As of today, it is not possible to test contenteditable elements (such as the awesome description editor)
    // https://github.com/testing-library/dom-testing-library/pull/235

    // If you see this and believe a test is possible to implement now, please do so :)
    // });
});
