import React, { useCallback, useContext } from "react";
import PropTypes from "prop-types";
import PublicationEndDateComponent from "../../../Offers/Form/form-components/PublicationEndDateComponent";
import EditOfferSchema from "../../../Offers/Edit/EditOfferSchema";
import { Box, Button, Typography } from "@material-ui/core";
import useOfferForm from "../../../../hooks/useOfferForm";
import { editOffer } from "../../../../services/offerService";
import { parseRequestErrors } from "../../../Offers/Form/OfferUtils";
import { useDispatch } from "react-redux";
import { addSnackbar } from "../../../../actions/notificationActions";
import { OfferManagementContext } from "./CompanyOffersManagementWidget";

export const QuickOfferEditForm = ({ offerId, showTitle = false }) => {
    const { offers, setOffers } = useContext(OfferManagementContext);

    const dispatch = useDispatch();
    const dispatchAddSnackbarAction = useCallback(
        (notification) => {
            dispatch(addSnackbar(notification));
        },
        [dispatch],
    );

    const { publishEndDate } = offers[offerId]["fields"];

    const { control, fields, errors } = useOfferForm(EditOfferSchema, {
        publishEndDate: publishEndDate.value,
    });

    const isObjectEmpty = useCallback(
        (object) =>
            Object.keys(object).length === 0 &&
            Object.getPrototypeOf(object) === Object.prototype,
        [],
    );

    const displaySuccessMessage = useCallback(() => {
        dispatchAddSnackbarAction({
            message: "Successfully updated",
        });
    }, [dispatchAddSnackbarAction]);

    const displayErrorMessage = useCallback(
        (err) => {
            dispatchAddSnackbarAction({
                message: `${parseRequestErrors(err).generalErrors[0].message}`,
            });
        },
        [dispatchAddSnackbarAction],
    );

    const changeOfferValues = useCallback(() => {
        const newDate = fields.publishEndDate?.toISOString();
        publishEndDate.value = newDate.slice(0, newDate.indexOf("T"));
        setOffers({ ...offers });
    }, [fields.publishEndDate, offers, publishEndDate.value, setOffers]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (isObjectEmpty(errors)) {
            editOffer({ offerId: offerId, publishEndDate: fields.publishEndDate })
                .then(() => {
                    displaySuccessMessage();

                    changeOfferValues();
                })
                .catch((err) => {
                    displayErrorMessage(err);
                });
        }
    };

    return (
        <form onSubmit={(e) => onSubmit(e)} aria-label="Quick Offer Edit Form">
            {showTitle && <Typography align="center">Quick Edit Offer</Typography>}
            <Box display="flex" alignItems="center" flexDirection="column">
                <PublicationEndDateComponent
                    fields={fields}
                    control={control}
                    showInfoTooltip={false}
                    errors={errors}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    data-testid="submit-offer"
                >
                    Submit
                </Button>
            </Box>
        </form>
    );
};

QuickOfferEditForm.propTypes = {
    offerId: PropTypes.string.isRequired,
    showTitle: PropTypes.bool.isRequired,
};
