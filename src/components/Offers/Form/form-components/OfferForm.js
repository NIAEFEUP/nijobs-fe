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
    Fade,
} from "@material-ui/core";
import React, { useState, useCallback, useContext, useRef, useEffect } from "react";
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
    ErrorSharp,
    KeyboardArrowDown,
    KeyboardArrowUp,
} from "@material-ui/icons";
import useOfferFormStyles from "./offerStyles";
import { Controller } from "react-hook-form";
import { useMobile } from "../../../../utils/media-queries";
import "../editor.css";
import ApplyURLComponent from "./ApplyURLComponent";
import ShowErrorButton from "./ShowErrorButton";
import { smoothScrollToRef } from "../../../../utils";

export const PAID_OPTIONS = [
    { value: "none", label: "Unspecified" },
    { value: true, label: "Paid" },
    { value: false, label: "Unpaid" },
];

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

    const refs = {
        title: useRef(null),
        owner: useRef(null),
        location: useRef(null),
        jobType: useRef(null),
        fields: useRef(null),
        technologies: useRef(null),
        jobStartDate: useRef(null),
        jobDuration: useRef(null),
        vacancies: useRef(null),
        isPaid: useRef(null),
        publishDate: useRef(null),
        publishEndDate: useRef(null),
        isHidden: useRef(null),
        applyURL: useRef(null),
        contacts: useRef(null),
        requirements: useRef(null),
        descriptionText: useRef(null),
    };
    const errorRef = useRef(null);
    const [existsError, setExistsError] = useState(false)

    useEffect(() => {
        if (errors.title || requestErrors.title)
            errorRef.current = refs.title.current;
        else if (errors.owner || requestErrors.owner)
            errorRef.current = refs.owner.current;
        else if (errors.location || requestErrors.location)
            errorRef.current = refs.location.current;
        else if (errors.jobType || requestErrors.jobType)
            errorRef.current = refs.jobType.current;
        else if (errors.fields || requestErrors.fields)
            errorRef.current = refs.fields.current;
        else if (errors.technologies || requestErrors.technologies)
            errorRef.current = refs.technologies.current;
        else if (errors.jobStartDate || requestErrors.jobStartDate)
            errorRef.current = refs.jobStartDate.current;
        else if (errors.jobDuration || errors.jobDuration)
            errorRef.current = refs.jobDuration.current;
        else if (errors.vacancies || requestErrors.vacancies)
            errorRef.current = refs.vacancies.current;
        else if (errors.isPaid || requestErrors.isPaid)
            errorRef.current = refs.isPaid.current;
        else if (errors.publishDate || requestErrors.publishDate)
            errorRef.current = refs.publishDate.current;
        else if (errors.publishEndDate || requestErrors.publishEndDate)
            errorRef.current = refs.publishEndDate.current;
        else if (errors.isHidden || requestErrors.isHidden)
            errorRef.current = refs.isHidden.current;
        else if (errors.applyURL || requestErrors.applyURL)
            errorRef.current = refs.applyURL.current;
        else if (errors.contacts || requestErrors.contacts)
            errorRef.current = refs.contacts.current;
        else if (errors.requirements || requestErrors.requirements)
            errorRef.current = refs.requirements.current;
        else if (errors.descriptionText || requestErrors.descriptionText)
            errorRef.current = refs.descriptionText.current;
        else
            errorRef.current = null;
        
        setExistsError(errorRef.current != null);
    })

    const showError = () => {
        smoothScrollToRef(errorRef);
    }

    return (
        success
            ? <Redirect to={`/offer/${offerId}`} push />
            :
            <div className={classes.formCard}>
                <CardHeader title={!isMobile && title } />
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
                                        <div ref={refs.title}>
                                            <TitleComponent
                                                disabled={formDisabled}
                                                errors={errors}
                                                requestErrors={requestErrors}
                                                control={control}
                                            />
                                        </div>
                                    </Grid>
                                    {showOwnerComponent &&
                                    <Grid item xs={12} lg={6}>
                                        <div ref={refs.owner}>
                                            <OwnerComponent
                                                disabled={formDisabled}
                                                errors={errors}
                                                requestErrors={requestErrors}
                                                control={control}
                                            />
                                        </div>
                                    </Grid>}
                                    <Grid item xs={12} lg={6}>
                                        <div ref={refs.location}>
                                            <FormControl fullWidth margin="dense">
                                                <LocationComponent
                                                    disabled={formDisabled}
                                                    errors={errors}
                                                    requestErrors={requestErrors}
                                                    control={control}
                                                />
                                            </FormControl>
                                        </div>  
                                    </Grid>
                                    <Grid item xs={12} lg={6} className={classes.jobTypeGrid}>
                                        <div ref={refs.jobType}>
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
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div ref={refs.fields}>
                                            <Controller
                                                name="fields"
                                                render={(
                                                    { field: {  onBlur, name } },
                                                ) => (
                                                    <MultiOptionAutocomplete
                                                        name={name}
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
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div ref={refs.technologies}>
                                            <Controller
                                                name="technologies"
                                                render={(
                                                    { field: { onBlur, name } },
                                                ) => (
                                                    <MultiOptionAutocomplete
                                                        name={name}
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
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div ref={refs.jobStartDate}>
                                            <FormControl fullWidth>
                                                <JobStartDateComponent
                                                    disabled={formDisabled}
                                                    errors={errors}
                                                    requestErrors={requestErrors}
                                                    control={control}
                                                />
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div ref={refs.jobDuration}>
                                            <JobDurationComponent
                                                disabled={formDisabled}
                                                errors={errors}
                                                requestErrors={requestErrors}
                                                control={control}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div ref={refs.vacancies}>
                                            <FormControl fullWidth>
                                                <VacanciesComponent
                                                    disabled={formDisabled}
                                                    errors={errors}
                                                    requestErrors={requestErrors}
                                                    control={control}
                                                />
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div ref={refs.isPaid}>
                                            <IsPaidComponent
                                                disabled={formDisabled}
                                                errors={errors}
                                                requestErrors={requestErrors}
                                                control={control}
                                                textFieldProps={{
                                                    ...SelectStylingProps,
                                                }}
                                            />
                                        </div>
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
                                                    <div ref={refs.publishDate}>
                                                        <PublicationDateComponent
                                                            disabled={formDisabled}
                                                            errors={errors}
                                                            requestErrors={requestErrors}
                                                            control={control}
                                                            datePickerProps={{
                                                                className: classes.advancedSettingsDatePicker,
                                                            }}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} lg={6} className={classes.gridWithInfo}>
                                                    <div ref={refs.publishEndDate}>
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
                                                    </div>
                                                </Grid>
                                                {
                                                    showHiddenField &&
                                                    <Grid item xs={12} lg={6} className={classes.gridWithInfo}>
                                                        <div ref={refs.isHidden}>
                                                            <IsHiddenComponent
                                                                disabled={formDisabled}
                                                                errors={errors}
                                                                requestErrors={requestErrors}
                                                                control={control}
                                                            />
                                                        </div>
                                                    </Grid>
                                                }
                                            </Grid>
                                        </Collapse>
                                    </Grid>
                                    <Grid item xs={12} className={classes.highlightOptionGrid}>
                                        <div ref={refs.applyURL}>
                                            <ApplyURLComponent
                                                disabled={formDisabled}
                                                errors={errors}
                                                requestErrors={requestErrors}
                                                control={control}
                                                classes={classes}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} className={classes.highlightOptionGrid}>
                                        <div ref={refs.contacts}>
                                            <MultiOptionTextField
                                                values={contacts}
                                                label="Contacts *"
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
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} className={classes.highlightOptionGrid}>
                                        <div ref={refs.requirements}>
                                            <MultiOptionTextField
                                                values={requirements}
                                                label="Requirements *"
                                                itemLabelPrefix="Requirement #"
                                                controllerName="requirements"
                                                onAdd={appendRequirement}
                                                onRemove={removeRequirement}
                                                getValues={getValues}
                                                control={control}
                                                errors={errors.requirements || requestErrors.requirements}
                                                disabled={formDisabled}
                                                textFieldProps={{ multiline: true }}
                                                addEntryBtnTestId="requirements-selector"
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <div ref={refs.descriptionText}>
                                    <TextEditorComponent
                                        fields={fields}
                                        disabled={formDisabled}
                                        errors={errors}
                                        requestErrors={requestErrors}
                                        control={control}
                                    />
                                </div>
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
                <Fade in={existsError}>
                    <div>
                        <ShowErrorButton onClick={showError} />
                    </div>
                </Fade>
            </div>
    );
};

OfferForm.propTypes = {
    context: PropTypes.object,
    title: PropTypes.string,
};

export default OfferForm;
