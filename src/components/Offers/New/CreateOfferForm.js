import { yupResolver } from "@hookform/resolvers/yup";
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
import React, { useCallback, useContext, useEffect } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useMobile } from "../../../utils/media-queries";
import CreateOfferSchema from "./CreateOfferSchema";
import useCreateOfferStyles from "./createOfferStyles";
import { defaultDates, parseRequestErrors } from "./CreateOfferUtils";
import "./editor.css";
import {
    KeyboardArrowDown,
    KeyboardArrowUp,
} from "@material-ui/icons";

import { INITIAL_JOB_DURATION } from "../../../reducers/searchOffersReducer";
import MultiOptionAutocomplete from "../../utils/form/MultiOptionAutocomplete";
import useFieldSelector from "../../utils/offers/useFieldSelector";
import useTechSelector from "../../utils/offers/useTechSelector";
import { newOffer } from "../../../services/offerService";
import useSession from "../../../hooks/useSession";
import { Redirect } from "react-router-dom";
import MultiOptionTextField from "../../utils/form/MultiOptionTextField";
import ConnectedLoginAlert from "../../utils/LoginAlert";
import TitleComponent from "./form-components/TitleComponent";
import OwnerComponent from "./form-components/OwnerComponent";
import LocationComponent from "./form-components/LocationComponent";
import JobTypeComponent from "./form-components/JobTypeComponent";
import JobStartDateComponent from "./form-components/JobStartDateComponent";
import JobDurationComponent from "./form-components/JobDurationComponent";
import VacanciesComponent from "./form-components/VacanciesComponent";
import IsPaidComponent from "./form-components/IsPaidComponent";
import PublicationDateComponent from "./form-components/PublicationDateComponent";
import PublicationEndDateComponent from "./form-components/PublicationEndDateComponent";
import IsHiddenComponent from "./form-components/IsHiddenComponent";
import TextEditorComponent from "./form-components/TextEditorComponent";

export const CreateOfferControllerContext = React.createContext();

export const PAID_OPTIONS = [
    { value: "none", label: "Unspecified" },
    { value: true, label: "Paid" },
    { value: false, label: "Unpaid" },
];

export const CreateOfferController = () => {

    const session = useSession();

    const isAdmin = session.data?.isAdmin;
    const company = session.data?.company?._id;
    const companyUnfinishedRegistration = session.data?.company?.hasFinishedRegistration === false;
    const isLoggedIn = session.isLoggedIn;

    const { handleSubmit, formState: { errors }, control, setValue, getValues, clearErrors } = useForm({
        mode: "all",
        resolver: yupResolver(CreateOfferSchema),
        reValidateMode: "onChange",
        defaultValues: {
            title: "",
            publishDate: defaultDates.getPublishDate(),
            publishEndDate: defaultDates.getPublishEndDate(),
            jobDuration: [INITIAL_JOB_DURATION, INITIAL_JOB_DURATION + 1],
            jobStartDate: null,
            description: "",
            descriptionText: "",
            contacts: [{ value: "" }],
            isPaid: "none",
            vacancies: "",
            jobType: "",
            fields: [],
            technologies: [],
            location: null,
            requirements: [{ value: "" }],
            isHidden: false,
            owner: "",
        },
    });

    const fields = useWatch({ control });

    const { fields: requirements, append: appendRequirement, remove: removeRequirement } = useFieldArray({
        control,
        name: "requirements",
    });

    const handleAppendRequirement = () => appendRequirement(DEFAULT_VALUE);

    const { fields: contacts, append: appendContact, remove: removeContact } = useFieldArray({
        control,
        name: "contacts",
    });

    const handleAppendContact = () => appendContact(DEFAULT_VALUE);

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [newOfferId, setNewOfferId] = React.useState();
    const [requestErrors, setRequestErrors] = React.useState({});

    useEffect(() => {
        if (!isLoggedIn) {
            clearErrors();
        }
    },
    [clearErrors, isLoggedIn]);

    const submit = useCallback(
        (data) => {
            setLoading(true);

            newOffer({
                ...data,
                vacancies: data.vacancies || undefined,
                contacts: data.contacts.map((val) => val.value),
                requirements: data.requirements.map((val) => (val, val.value)),
                isPaid: data.isPaid === "none" ? undefined : data.isPaid,
                jobStartDate: !data.jobStartDate ? undefined : data.jobStartDate,
                owner: data.owner || company,
            })
                .then((obj) => {
                    setRequestErrors({});
                    setNewOfferId(obj._id);
                    setLoading(false);
                    setSuccess(true);
                })
                .catch((err) => {
                    const reqErrors = parseRequestErrors(err);
                    setRequestErrors(reqErrors);
                    setLoading(false);
                });
        },
        [company],
    );

    const DEFAULT_VALUE = { value: "" };

    return {
        controllerOptions: {
            initialValue: {
                submit: handleSubmit(submit),
                control,
                contacts,
                requirements,
                fields,
                errors,
                requestErrors,
                appendContact: handleAppendContact,
                removeContact,
                appendRequirement: handleAppendRequirement,
                removeRequirement,
                getValues,
                setValue,
                loading,
                success,
                newOfferId,
                setLoading,
                isAdmin,
                company,
                isLoggedIn,
                companyUnfinishedRegistration,
            },
        },
    };
};


const CreateOfferForm = () => {

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
        setValue,
        loading,
        success,
        newOfferId,
        isAdmin,
        isLoggedIn,
        companyUnfinishedRegistration,
    } = useContext(CreateOfferControllerContext);

    const isMobile = useMobile();

    const disabled = !isLoggedIn || companyUnfinishedRegistration;

    const [isAdvancedOpen, setAdvancedOpen] = React.useState(false);

    const isAdvancedOpenOrErrors = useCallback(() => (
        isAdvancedOpen ||
        !!errors.publishDate ||
        !!errors.publishEndDate ||
        !!errors.isHidden
    ), [errors.isHidden, errors.publishDate, errors.publishEndDate, isAdvancedOpen]);

    const Content = isMobile ? DialogContent : CardContent;
    const classes = useCreateOfferStyles(isMobile)();

    const FieldsSelectorProps = useFieldSelector(fields.fields, (fields) => setValue("fields", fields));
    const TechSelectorProps = useTechSelector(fields.technologies, (fields) => setValue("technologies", fields));

    const SelectStylingProps = {
        SelectProps: {
            classes: {
                select: classes.menuSelect,
            },
        },
    };

    return (
        success
            ? <Redirect to={`/offer/${newOfferId}`} push />
            :
            <div className={classes.formCard}>
                <CardHeader title={!isMobile && "New Offer" } />
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
                                    <Grid item xs={12} lg={isAdmin ? 6 : 12}>
                                        <TitleComponent
                                            disabled={disabled}
                                            errors={errors}
                                            requestErrors={requestErrors}
                                            control={control}
                                        />
                                    </Grid>
                                    {isAdmin &&
                                    <Grid item xs={12} lg={6}>
                                        <OwnerComponent
                                            disabled={disabled}
                                            errors={errors}
                                            requestErrors={requestErrors}
                                            control={control}
                                        />
                                    </Grid>}
                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth margin="dense">
                                            <LocationComponent
                                                disabled={disabled}
                                                errors={errors}
                                                requestErrors={requestErrors}
                                                control={control}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6} className={classes.jobTypeGrid}>
                                        <FormControl fullWidth margin="dense">
                                            <JobTypeComponent
                                                disabled={disabled}
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
                                                { field: {  onBlur, name } },
                                            ) => (
                                                <MultiOptionAutocomplete
                                                    name={name}
                                                    onBlur={onBlur}
                                                    error={errors.fields || requestErrors.fields}
                                                    disabled={disabled}
                                                    chipWrapperProps={{
                                                        className: classes.autocompleteChipWrapper,
                                                    }}
                                                    textFieldProps={{
                                                        margin: "none",
                                                    }}
                                                    {...FieldsSelectorProps}
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
                                                    onBlur={onBlur}
                                                    error={errors.technologies || requestErrors.technologies}
                                                    disabled={disabled}
                                                    chipWrapperProps={{
                                                        className: classes.autocompleteChipWrapper,
                                                    }}
                                                    textFieldProps={{
                                                        margin: "none",
                                                    }}
                                                    {...TechSelectorProps}
                                                />)}
                                            control={control}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth>
                                            <JobStartDateComponent
                                                disabled={disabled}
                                                errors={errors}
                                                requestErrors={requestErrors}
                                                control={control}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6} className={classes.jobDurationGrid}>
                                        <JobDurationComponent
                                            disabled={disabled}
                                            errors={errors}
                                            requestErrors={requestErrors}
                                            control={control}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6} className={classes.vacanciesGrid}>
                                        <FormControl fullWidth>
                                            <VacanciesComponent
                                                disabled={disabled}
                                                errors={errors}
                                                requestErrors={requestErrors}
                                                control={control}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <IsPaidComponent
                                            disabled={disabled}
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
                                                isAdvancedOpenOrErrors()
                                                    ? <KeyboardArrowUp />
                                                    : <KeyboardArrowDown />}
                                        >
                                            <Typography>Advanced Settings</Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} lg={12}>
                                        <Collapse in={isAdvancedOpenOrErrors()}>
                                            <Grid container spacing={4} className={classes.advancedSettingsCollapse}>
                                                <Grid item xs={12} lg={6} className={classes.gridWithInfo}>
                                                    <PublicationDateComponent
                                                        disabled={disabled}
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
                                                        disabled={disabled}
                                                        errors={errors}
                                                        requestErrors={requestErrors}
                                                        control={control}
                                                        datePickerProps={{
                                                            className: classes.advancedSettingsDatePicker,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} lg={6} className={classes.gridWithInfo}>
                                                    <IsHiddenComponent
                                                        disabled={disabled}
                                                        errors={errors}
                                                        requestErrors={requestErrors}
                                                        control={control}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Collapse>
                                    </Grid>
                                    <Grid item xs={12} className={classes.multiTextOptionGrid}>
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
                                            disabled={disabled}
                                            addEntryBtnTestId="contacts-selector"
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={classes.multiTextOptionGrid}>
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
                                            disabled={disabled}
                                            textFieldProps={{ multiline: true }}
                                            addEntryBtnTestId="requirements-selector"
                                        />
                                    </Grid>
                                </Grid>
                                <TextEditorComponent
                                    fields={fields}
                                    disabled={disabled}
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
                                    disabled={loading || disabled}
                                    variant="contained"
                                    color="primary"
                                    onClick={submit}
                                    data-testid="submit-offer"
                                >
                                    Submit
                                </Button>
                                <div className={classes.requiredFields}>
                                    <p>* Required fields</p>
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                </Content>
            </div>
    );
};

export default CreateOfferForm;
