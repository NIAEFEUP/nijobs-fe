import React, { useCallback, useContext } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useFieldArray, useWatch } from "react-hook-form";
import { FinishCompanyRegistrationControllerContext } from "./FinishCompanyRegistrationWidget";
import { FinishCompanyRegistrationConstants } from "./FinishCompanyRegistrationUtils";
import MultiOptionTextField from "../../../utils/form/MultiOptionTextField";

export const useContacts = ({ control }) => {

    const DEFAULT_VALUE = { value: "" };

    const { fields, append, remove } = useFieldArray({
        control,
        name: "contacts",
    });

    const contacts = useWatch({
        name: "contacts",
        control,
    });

    const validateStep = useCallback(() =>
        contacts?.length >= FinishCompanyRegistrationConstants.contacts.min
        && contacts?.length <= FinishCompanyRegistrationConstants.contacts.max
        && contacts.every(({ value }) => value !== "")
    , [contacts]);

    return {
        validateStep,
        fields,
        append: () => append({ DEFAULT_VALUE }),
        remove,
    };
};
const ContactsForm = () => {

    const {
        contactsOptions,
        control,
        getValues,
        errors,
    } = useContext(FinishCompanyRegistrationControllerContext);

    const { fields, append, remove } = contactsOptions;

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Enter your contacts.
                </Typography>
                <Typography variant="caption" gutterBottom paragraph>
                    Give us any form of communication that students can use if they want to contact you.
                    It can be anything: e-mail, phone number or some website.
                </Typography>
                <Box fontStyle="italic" my={2}>
                    <Typography variant="caption" gutterBottom paragraph>
                        Smoke signals are currently not supported, though.
                    </Typography>
                </Box>

                <MultiOptionTextField
                    values={fields}
                    label="Contacts"
                    itemLabelPrefix="Contact #"
                    controllerName="contacts"
                    onAdd={append}
                    onRemove={remove}
                    getValues={getValues}
                    control={control}
                    errors={errors.contacts}
                    disabled={Object.keys(fields).length >= FinishCompanyRegistrationConstants.contacts.max}
                />
            </Grid>
        </Grid>
    );
};

export default ContactsForm;
