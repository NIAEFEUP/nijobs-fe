import React from "react";
import { createTheme } from "@material-ui/core";
import { fireEvent } from "@testing-library/dom";
import { renderWithStoreAndTheme } from "../../../test-utils";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes from "prop-types";

import OfferEndDateQuickEdit from "./OfferEndDateQuickEdit";

const OfferEndDateQuickEditWrapper = ({
    offerId = "mockid", dateValue = "",
}) => (
    <OfferEndDateQuickEdit
        offerId={offerId}
        dateValue={dateValue}
    />
);

OfferEndDateQuickEditWrapper.propTypes = {
    offerId: PropTypes.string.isRequired,
    dateValue: PropTypes.string.isRequired,
};

describe("Quick Edit Publish End Date", () => {
    const initialState = {};
    const theme = createTheme({});

    it("Should display datepicker calendar when edit button is clicked", () => {
        const quickEditComponent = renderWithStoreAndTheme(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <OfferEndDateQuickEditWrapper />
            </MuiPickersUtilsProvider>,
            { initialState: initialState, theme: theme }
        );

        const editIcon = quickEditComponent.getByTestId("QuickEndDateEditIcon");
        fireEvent.click(editIcon);

        expect(quickEditComponent.getByTestId("quickEditPublishEndDate-input-mockid")).toBeInTheDocument();
    });
});
