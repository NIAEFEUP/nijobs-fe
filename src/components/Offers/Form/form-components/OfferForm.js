import {
    CardContent,
    CardHeader,
    DialogContent,
    FormHelperText,
    Grid,
    FormControl,
    Typography,
    Collapse,
    Button,
} from "@material-ui/core";
import React, { useState, useCallback, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import MultiOptionTextField from "../../../utils/form/MultiOptionTextField";
import MultiOptionAutocomplete from "../../../utils/form/MultiOptionAutocomplete";
import ConnectedLoginAlert from "../../../utils/LoginAlert";
import TitleComponent from "./TitleComponent";
import OwnerComponent from "./OwnerComponent";
import LocationComponent from "./LocationComponent";
import JobTypeComponent from "./JobTypeComponent";
import JobStartDateComponent from "./JobStartDateComponent";
import JobDurationComponent from "./JobDurationComponent";
import VacanciesComponent from "./VacanciesComponent";
import IsPaidComponent from "./IsPaidComponent";
import PublicationDateComponent from "./PublicationDateComponent";
import PublicationEndDateComponent from "./PublicationEndDateComponent";
import IsHiddenComponent from "./IsHiddenComponent";
import TextEditorComponent from "./TextEditorComponent";
import {
    KeyboardArrowDown,
    KeyboardArrowUp,
} from "@material-ui/icons";
import useOfferFormStyles from "./offerStyles";
import { Controller } from "react-hook-form";
import { useMobile } from "../../../../utils/media-queries";
import "../editor.css";
import ApplyURLComponent from "./ApplyURLComponent";

export const PAID_OPTIONS = [
    { value: "none", label: "Unspecified" },
    { value: true, label: "Paid" },
    { value: false, label: "Unpaid" },
];

const scrollToError = (errorArray) => {
    if (Object.keys(errorArray).length !== 0) {
        const element = document.getElementById(Object.keys(errorArray)[0]);
        if (element?.scrollIntoView) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        if (element?.focus) {
            element.focus();
        }
    }
};

const OfferForm = ({ context, title }) => {
    const {
        submit,
        errors,
        requestErrors,
        control,
        fields,
        contacts,
        requirements,
        getValues,
        appendContact,
        removeContact,
        appendRequirement,
        removeRequirement,
        fieldsSelectorProps,
        techSelectorProps,
        loading,
        success,
        offerId,
        isAdmin,
        isLoggedIn,
        companyUnfinishedRegistration,
        showCompanyField,
        showHiddenField,
    } = useContext(context);

    const isMobile = useMobile();

    const formDisabled = !isLoggedIn || companyUnfinishedRegistration;

    const [isAdvancedOpen, setAdvancedOpen] = useState(false);

    const shouldShowAdvancedOptions = useCallback(() => (
        isAdvancedOpen ||
        !!errors.publishDate || !!requestErrors.publishDate ||
        !!errors.publishEndDate || !!requestErrors.publishEndDate ||
        !!errors.isHidden
    ), [
        errors.isHidden,
        errors.publishDate,
        errors.publishEndDate,
        isAdvancedOpen,
        requestErrors.publishDate,
        requestErrors.publishEndDate,
    ]);

    const Content = isMobile ? DialogContent : CardContent;
    const classes = useOfferFormStyles(isMobile)();

    const showOwnerComponent = isAdmin && showCompanyField;

    const SelectStylingProps = {
        SelectProps: {
            classes: {
                select: classes.menuSelect,
            },
        },
    };

    useEffect(() => {
        scrollToError(errors);
    }, [errors]);

    useEffect(() => {
        scrollToError(requestErrors);
    }, [requestErrors]);

    return (
        success
            ? <Redirect to={`/offer/${offerId}`} push />
            :
            <div className={classes.formCard}>
                <CardHeader title={!isMobile && title} />
                <Content className={classes.formContent}>
                    <ConnectedLoginAlert
                        isLoggedIn={isLoggedIn}
                        companyUnfinishedRegistration={companyUnfinishedRegistration}
                    />
                    <Grid container className={classes.formArea}>
                        <Grid item xs={12}>
                            <form
                                onSubmit={submit}
                                aria-label="Create Offer Form"
                            >
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={showOwnerComponent ? 6 : 12}>
                                        <TitleComponent
                                            disabled={formDisabled}
                                            errors={errors}
                                            requestErrors={requestErrors}
                                            control={control}
                                        />
                                    </Grid>
                                    {showOwnerComponent &&
                                    <Grid item xs={12} lg={6}>
                                        <OwnerComponent
                                            disabled={formDisabled}
                                            errors={errors}
                                            requestErrors={requestErrors}
                                            control={control}
                                        />
                                    </Grid>}
                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth margin="dense">
                                            <LocationComponent
                                                disabled={formDisabled}
                                                errors={errors}
                                                requestErrors={requestErrors}
                                                control={control}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6} className={classes.jobTypeGrid}>
                                        <FormControl fullWidth margin="dense">
                                            <JobTypeComponent
                                                disabled={formDisabled}
                                                errors={errors}
                                                requestErrors={requestErrors}
                                                control={control}
                                                textFieldProps={{
                                                    ...SelectStylingProps,
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Controller
                                            name="fields"
                                            render={(
                                                { field: { onBlur, name } },
                                            ) => (
                                                <MultiOptionAutocomplete
                                                    name={name}
                                                    id={name}
                                                    onBlur={onBlur}
                                                    error={errors.fields || requestErrors.fields}
                                                    disabled={formDisabled}
                                                    chipWrapperProps={{
                                                        className: classes.autocompleteChipWrapper,
                                                    }}
                                                    textFieldProps={{
                                                        margin: "none",
                                                    }}
                                                    {...fieldsSelectorProps}
                                                    label="Fields *"
                                                    placeholder="Fields *"
                                                />
                                            )}
                                            control={control}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Controller
                                            name="technologies"
                                            render={(
                                                { field: { onBlur, name } },
                                            ) => (
                                                <MultiOptionAutocomplete
                                                    name={name}
                                                    id={name}
                                                    onBlur={onBlur}
                                                    error={errors.technologies || requestErrors.technologies}
                                                    disabled={formDisabled}
                                                    chipWrapperProps={{
                                                        className: classes.autocompleteChipWrapper,
                                                    }}
                                                    textFieldProps={{
                                                        margin: "none",
                                                    }}
                                                    {...techSelectorProps}
                                                    label="Technologies *"
                                                    placeholder="Technologies *"
                                                />)}
                                            control={control}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth>
                                            <JobStartDateComponent
                                                disabled={formDisabled}
                                                errors={errors}
                                                requestErrors={requestErrors}
                                                control={control}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <JobDurationComponent
                                            disabled={formDisabled}
                                            errors={errors}
                                            requestErrors={requestErrors}
                                            control={control}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth>
                                            <VacanciesComponent
                                                disabled={formDisabled}
                                                errors={errors}
                                                requestErrors={requestErrors}
                                                control={control}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <IsPaidComponent
                                            disabled={formDisabled}
                                            errors={errors}
                                            requestErrors={requestErrors}
                                            control={control}
                                            textFieldProps={{
                                                ...SelectStylingProps,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={12}>
                                        <Button
                                            onClick={() => setAdvancedOpen(!isAdvancedOpen)}
                                            size="small"
                                            margin="dense"
                                            endIcon={
                                                shouldShowAdvancedOptions()
                                                    ? <KeyboardArrowUp />
                                                    : <KeyboardArrowDown />}
                                        >
                                            <Typography>Advanced Settings</Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} lg={12}>
                                        <Collapse in={shouldShowAdvancedOptions()}>
                                            <Grid container spacing={4} className={classes.advancedSettingsCollapse}>
                                                <Grid item xs={12} lg={6} className={classes.gridWithInfo}>
                                                    <PublicationDateComponent
                                                        disabled={formDisabled}
                                                        errors={errors}
                                                        requestErrors={requestErrors}
                                                        control={control}
                                                        datePickerProps={{
                                                            className: classes.advancedSettingsDatePicker,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} lg={6} className={classes.gridWithInfo}>
                                                    <PublicationEndDateComponent
                                                        fields={fields}
                                                        disabled={formDisabled}
                                                        errors={errors}
                                                        requestErrors={requestErrors}
                                                        control={control}
                                                        datePickerProps={{
                                                            className: classes.advancedSettingsDatePicker,
                                                        }}
                                                    />
                                                </Grid>
                                                {
                                                    showHiddenField &&
                                                    <Grid item xs={12} lg={6} className={classes.gridWithInfo}>
                                                        <IsHiddenComponent
                                                            disabled={formDisabled}
                                                            errors={errors}
                                                            requestErrors={requestErrors}
                                                            control={control}
                                                        />
                                                    </Grid>
                                                }
                                            </Grid>
                                        </Collapse>
                                    </Grid>
                                    <Grid item xs={12} className={classes.highlightOptionGrid}>
                                        <ApplyURLComponent
                                            disabled={formDisabled}
                                            errors={errors}
                                            requestErrors={requestErrors}
                                            control={control}
                                            classes={classes}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={classes.highlightOptionGrid}>
                                        <MultiOptionTextField
                                            values={contacts}
                                            label="Contacts *"
                                            id="contacts"
                                            itemLabelPrefix="Contact #"
                                            controllerName="contacts"
                                            onAdd={appendContact}
                                            onRemove={removeContact}
                                            getValues={getValues}
                                            control={control}
                                            errors={errors.contacts || requestErrors.contacts}
                                            disabled={formDisabled}
                                            addEntryBtnTestId="contacts-selector"
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={classes.highlightOptionGrid}>
                                        <MultiOptionTextField
                                            values={requirements}
                                            label="Requirements *"
                                            id="requirements"
                                            itemLabelPrefix="Requirement #"
                                            controllerName="requirements"
                                            onAdd={appendRequirement}
                                            onRemove={removeRequirement}
                                            getValues={getValues}
                                            control={control}
                                            errors={errors.requirements || requestErrors.requirements}
                                            disabled={formDisabled}
                                            addEntryBtnTestId="requirements-selector"
                                        />
                                    </Grid>
                                </Grid>
                                <TextEditorComponent
                                    fields={fields}
                                    disabled={formDisabled}
                                    errors={errors}
                                    requestErrors={requestErrors}
                                    control={control}
                                />
                                {requestErrors.generalErrors ?
                                    requestErrors.generalErrors.map((error, idx) => (
                                        <FormHelperText key={`${error.message}-${idx}`} error>
                                            {error.message}
                                        </FormHelperText>
                                    ))
                                    :
                                    <FormHelperText error={true}>
                                        {" "}
                                    </FormHelperText>
                                }
                                <Button
                                    disabled={loading || formDisabled}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    data-testid="submit-offer"
                                >
                                    Submit
                                </Button>
                                <div className={classes.requiredFields}>
                                    <Typography>* Required fields</Typography>
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                </Content>
            </div>
    );
};

OfferForm.propTypes = {
    context: PropTypes.object,
    title: PropTypes.string,
};

export default OfferForm;
