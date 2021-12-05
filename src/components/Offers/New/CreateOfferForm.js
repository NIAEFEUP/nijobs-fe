import { yupResolver } from "@hookform/resolvers/yup";
import {
    CardContent,
    CardHeader,
    DialogContent,
    FormHelperText,
    Grid,
    TextField,
    FormControl,
    Typography,
    Collapse,
    Button,
    Slider,
    Checkbox,
    FormControlLabel,
    MenuItem,
    CircularProgress,
    Tooltip,
} from "@material-ui/core";
import React, { useCallback, useContext, useEffect } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useMobile } from "../../../utils/media-queries";
import CreateOfferSchema from "./CreateOfferSchema";
import useCreateOfferStyles from "./createOfferStyles";
import { CreateOfferConstants, defaultDates, parseRequestErrors } from "./CreateOfferUtils";
import "./editor.css";
import {
    KeyboardArrowDown,
    KeyboardArrowUp,
    Info,
} from "@material-ui/icons";
import { KeyboardDatePicker } from "@material-ui/pickers";

import JobOptions from "../../utils/offers/JobOptions";
import { INITIAL_JOB_DURATION, JOB_MIN_DURATION, JOB_MAX_DURATION } from "../../../reducers/searchOffersReducer";
import MultiOptionAutocomplete from "../../utils/form/MultiOptionAutocomplete";
import useFieldSelector from "../../utils/offers/useFieldSelector";
import useTechSelector from "../../utils/offers/useTechSelector";
import { newOffer } from "../../../services/offerService";
import useSession from "../../../hooks/useSession";
import { Redirect } from "react-router-dom";
import MultiOptionTextField from "../../utils/form/MultiOptionTextField";
import TextEditor from "../../utils/TextEditor";
import LocationPicker from "../../utils/LocationPicker";
import ConnectedLoginAlert from "../../utils/LoginAlert";

export const CreateOfferControllerContext = React.createContext();

export const PAID_OPTIONS = [
    { value: "", label: "Unspecified" },
    { value: true, label: "Paid" },
    { value: false, label: "Unpaid" },
];

export const CreateOfferController = () => {

    const session = useSession();

    const isAdmin = session.data?.isAdmin;
    const company = session.data?.company?._id;
    const companyUnfinishedRegistration = session.data?.company?.hasFinishedRegistration === false;
    const isLoggedIn = session.isLoggedIn;

    // eslint-disable-next-line no-unused-vars
    const { handleSubmit, formState: { errors }, control, setValue, getValues, clearErrors } = useForm({
        mode: "all",
        resolver: yupResolver(CreateOfferSchema),
        reValidateMode: "onChange",
        defaultValues: {
            title: "",
            publishDate: defaultDates.publishDate(),
            publishEndDate: defaultDates.publishEndDate(),
            jobDuration: [INITIAL_JOB_DURATION, INITIAL_JOB_DURATION + 1],
            jobStartDate: null,
            description: "",
            descriptionText: "",
            contacts: [{ value: "" }],
            isPaid: "",
            // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input
            vacancies: "",
            jobType: "",
            fields: [],
            technologies: [],
            location: null,
            requirements: [],
            isHidden: false,
            owner: "",
        },
    });

    const fields = useWatch({ control });

    const { fields: requirements, append: appendRequirement, remove: removeRequirement } = useFieldArray({
        control,
        name: "requirements",
    });

    const { fields: contacts, append: appendContact, remove: removeContact } = useFieldArray({
        control,
        name: "contacts",
    });

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
                isPaid: data.isPaid === "" ? undefined : data.isPaid,
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
                appendContact: () => appendContact(DEFAULT_VALUE),
                removeContact,
                appendRequirement: () => appendRequirement(DEFAULT_VALUE),
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
                                <Grid container>
                                    <Grid item xs={12} lg={isAdmin ? 6 : 12}>
                                        <Controller
                                            name="title"
                                            render={(
                                                { field: { onChange, onBlur, ref, name, value } },
                                            ) => (
                                                <TextField
                                                    name={name}
                                                    value={value}
                                                    label="Offer Title"
                                                    id="title"
                                                    error={!!errors.title || !!requestErrors.title}
                                                    inputRef={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    helperText={
                                                        `${value?.length}/${CreateOfferConstants.title.maxLength} 
                                        ${errors.title?.message || requestErrors.title?.message || ""}`
                                                    }
                                                    variant="outlined"
                                                    margin="dense"
                                                    fullWidth
                                                    disabled={disabled}
                                                />)}
                                            control={control}
                                        />
                                    </Grid>

                                    {isAdmin &&
                                    <Grid item xs={12} lg={6}>
                                        <Controller
                                            name="owner"
                                            render={(
                                                { field: { onChange, onBlur, ref, name, value } },
                                            ) => (
                                                <TextField
                                                    name={name}
                                                    value={value}
                                                    label="Owner ID"
                                                    id="owner"
                                                    error={!!errors.owner || !!requestErrors.owner}
                                                    inputRef={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    helperText={
                                                        `${errors.owner?.message || requestErrors.owner?.message || ""}`
                                                    }
                                                    variant="outlined"
                                                    margin="dense"
                                                    fullWidth
                                                    disabled={disabled}
                                                />)}
                                            control={control}
                                        />
                                    </Grid>}

                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth margin="dense">
                                            <Controller
                                                name="location"
                                                render={(
                                                    { field: { onChange, onBlur, name, value } },
                                                ) => (
                                                    <LocationPicker
                                                        value={value}
                                                        onChange={(_e, value) => onChange(value)}
                                                        onBlur={onBlur}
                                                        name={name}
                                                        error={errors.location || requestErrors.location}
                                                        disabled={disabled}
                                                    />
                                                )}
                                                control={control}
                                            />

                                        </FormControl>

                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth margin="dense">

                                            <Controller
                                                name="jobType"
                                                render={(
                                                    { field: { onChange, onBlur, name, value } },
                                                ) => (
                                                    <TextField
                                                        name={name}
                                                        fullWidth
                                                        id="job_type"
                                                        select
                                                        label="Job Type"
                                                        value={value ? value : ""}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        variant="outlined"
                                                        disabled={disabled}
                                                        error={!!errors?.jobType || !!requestErrors.jobType}
                                                        helperText={
                                                            `${errors.jobType?.message || requestErrors.jobType?.message || ""}`
                                                        }
                                                    >
                                                        {JobOptions.map(({ value, label }) => (
                                                            <MenuItem
                                                                key={value}
                                                                value={value}
                                                            >
                                                                {label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>

                                                )}
                                                control={control}
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
                                                    {...TechSelectorProps}
                                                />)}
                                            control={control}
                                        />

                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl>
                                            <Controller
                                                name="jobStartDate"
                                                render={(
                                                    { field: { onChange, onBlur, name, value } },
                                                ) => (
                                                    <KeyboardDatePicker
                                                        margin="dense"
                                                        value={value}
                                                        label="Job Start Date"
                                                        id="startDate-input"
                                                        name={name}
                                                        onChange={(_, value) => (onChange(value))}
                                                        onBlur={onBlur}
                                                        variant="inline"
                                                        autoOk
                                                        disabled={disabled}
                                                        format="yyyy-MM-dd"
                                                        minDate={Date.now()}
                                                        error={!!errors?.jobStartDate || !!requestErrors.jobStartDate}
                                                        helperText={
                                                            `${errors.jobStartDate?.message ||
                                                    requestErrors.jobStartDate?.message || " "}`
                                                        }
                                                    />)}
                                                control={control}
                                            />

                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>

                                        <Controller
                                            name="jobDuration"
                                            render={(
                                                { field: { onChange, onBlur, name, value } },
                                            ) => (
                                                <FormControl
                                                    margin="normal"
                                                    variant="outlined"
                                                    fullWidth
                                                >
                                                    <Slider
                                                        name={name}
                                                        value={value}
                                                        onChange={(_e, values) => onChange(values)}
                                                        onBlur={onBlur}
                                                        valueLabelDisplay="auto"
                                                        aria-labelledby="range-slider"
                                                        min={JOB_MIN_DURATION}
                                                        max={JOB_MAX_DURATION}
                                                        disabled={disabled}
                                                    />

                                                    <FormHelperText>
                                                        {!disabled && `Job duration: ${value[0]} - ${value[1]} month(s)`}
                                                    </FormHelperText>

                                                </FormControl>)}
                                            control={control}
                                        />

                                    </Grid>

                                    <Grid item xs={12} lg={6}>
                                        <FormControl>
                                            <Controller
                                                name="vacancies"
                                                render={(
                                                    { field: { onChange, onBlur, name, ref, value } },
                                                ) => (
                                                    <TextField
                                                        name={name}
                                                        value={value}
                                                        label="Vacancies"
                                                        id="vacancies"
                                                        disabled={disabled}
                                                        error={!!errors?.vacancies || !!requestErrors.vacancies}
                                                        helperText={
                                                            `${errors.vacancies?.message ||
                                                                            requestErrors.vacancies?.message || ""}`
                                                        }
                                                        inputRef={ref}
                                                        onChange={(_e) => {
                                                            let value = _e.target.value.replace(/[^0-9]/g, "");
                                                            value = value ? Number.parseInt(value, 10) : "";
                                                            onChange(value);
                                                        }}
                                                        onBlur={onBlur}
                                                    />)}
                                                control={control}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} lg={6}>
                                        <Controller
                                            name="isPaid"
                                            render={(
                                                { field: { onChange, onBlur, name, value } },
                                            ) => (
                                                <TextField
                                                    name={name}
                                                    fullWidth
                                                    id="is-paid"
                                                    select
                                                    label="Compensation"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    variant="outlined"
                                                    disabled={disabled}
                                                    error={!!errors?.isPaid || !!requestErrors.isPaid}
                                                    helperText={
                                                        `${errors.isPaid?.message || requestErrors.isPaid?.message || " "}`
                                                    }
                                                >
                                                    {PAID_OPTIONS.map(({ value, label }) => (
                                                        <MenuItem
                                                            key={value}
                                                            value={value}
                                                        >
                                                            {label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            )}
                                            control={control}
                                        />
                                    </Grid>

                                    <Grid item xs={12} lg={12}>
                                        <Button
                                            onClick={() => setAdvancedOpen(!isAdvancedOpen)}
                                            size="small"
                                            margin="dense"
                                            style={{ marginTop: 10 }}
                                            endIcon={
                                                isAdvancedOpenOrErrors()
                                                    ? <KeyboardArrowUp />
                                                    : <KeyboardArrowDown />}
                                        >
                                            <Typography>Advanced Settings</Typography>

                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} lg={12}>
                                        <Collapse
                                            in={isAdvancedOpenOrErrors()}
                                        >
                                            <Grid container>
                                                <Grid item xs={12} lg={6} className={classes.gridWithInfo}>

                                                    <Controller
                                                        name="publishDate"
                                                        render={(
                                                            { field: { onChange, onBlur, name, value } },
                                                        ) => (
                                                            <KeyboardDatePicker
                                                                margin="dense"
                                                                value={value}
                                                                label="Publication Date"
                                                                id="publishDate-input"
                                                                name={name}
                                                                disabled={disabled}
                                                                onChange={(_, value) => onChange(value)}
                                                                onBlur={onBlur}
                                                                variant="inline"
                                                                autoOk
                                                                format="yyyy-MM-dd"
                                                                minDate={Date.now()}
                                                                error={!!errors?.publishDate || !!requestErrors?.publishDate }
                                                                helperText={errors.publishDate?.message ||
                                                    requestErrors.publishDate?.message || " "}
                                                            />)}
                                                        control={control}
                                                    />

                                                    <Tooltip
                                                        title="The offer will only be visible after this date"
                                                        placement="top"
                                                    >
                                                        <Info fontSize="small" />
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item xs={12} lg={6} className={classes.gridWithInfo}>

                                                    <Controller
                                                        name="publishEndDate"
                                                        render={(
                                                            { field: { onChange, onBlur, name, value } },
                                                        ) => (
                                                            <KeyboardDatePicker
                                                                margin="dense"
                                                                value={value}
                                                                label="Publication End Date"
                                                                id="publishEndDate-input"
                                                                name={name}
                                                                disabled={disabled}
                                                                onChange={(_, value) => {
                                                                    const date = new Date(value);
                                                                    date.setHours(23, 59, 59, 0);
                                                                    onChange(date);
                                                                }}
                                                                onBlur={onBlur}
                                                                variant="inline"
                                                                autoOk
                                                                format="yyyy-MM-dd"
                                                                minDate={fields.publishDate}
                                                                error={!!errors?.publishEndDate ||
                                                                                 !!requestErrors.publishEndDate}
                                                                helperText={errors.publishEndDate?.message ||
                                                    requestErrors.publishEndDate?.message || " "}
                                                            />)}
                                                        control={control}
                                                    />

                                                    <Tooltip
                                                        title="The offer will only be visible until this date"
                                                        placement="top"
                                                    >
                                                        <Info fontSize="small" />
                                                    </Tooltip>
                                                </Grid>

                                                <Grid item xs={12} lg={6} className={classes.gridWithInfo}>
                                                    <FormControlLabel
                                                        label="Hide offer"
                                                        disabled={disabled}
                                                        control={
                                                            <Controller
                                                                name="isHidden"
                                                                render={(
                                                                    { field: { onChange, onBlur, name, value } },
                                                                ) => (
                                                                    <Checkbox
                                                                        checked={value}
                                                                        onChange={onChange}
                                                                        name={name}
                                                                        onBlur={onBlur}
                                                                        disabled={disabled}
                                                                    />
                                                                )}
                                                                control={control}
                                                            />
                                                        }
                                                    />
                                                    <Tooltip
                                                        title="If the offer is hidden, users won't be able to see it"
                                                        placement="top"
                                                    >
                                                        <Info fontSize="small" />
                                                    </Tooltip>
                                                </Grid>
                                            </Grid>

                                        </Collapse>
                                    </Grid>
                                </Grid>
                                <MultiOptionTextField
                                    values={contacts}
                                    label="Contacts"
                                    itemLabel="Contact #"
                                    controllerName="contacts"
                                    onAdd={appendContact}
                                    onRemove={removeContact}
                                    getValues={getValues}
                                    control={control}
                                    errors={errors.contacts || requestErrors.contacts}
                                    disabled={disabled}
                                    addEntryBtnTestId="contacts-selector"
                                />
                                <MultiOptionTextField
                                    values={requirements}
                                    label="Requirements"
                                    itemLabel="Requirement #"
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

                                <Controller
                                    name="descriptionText"
                                    render={(
                                        { field: { onChange: onChangeDescriptionText } },
                                    ) => (
                                        <Controller
                                            name="description"
                                            render={(
                                                { field: { onChange: onChangeDescription } },
                                            ) => (
                                                <TextEditor
                                                    onChangeDescription={onChangeDescription}
                                                    onChangeDescriptionText={onChangeDescriptionText}
                                                    error={!!errors?.descriptionText || !!requestErrors?.descriptionText}
                                                    content={fields.description}
                                                    helperText={errors.descriptionText?.message ||
                                        requestErrors.descriptionText?.message || " "}
                                                    disabled={disabled}
                                                />
                                            )}
                                            control={control}
                                        />
                                    )}
                                    control={control}
                                />
                                <Grid item xs={12} lg={12} />
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
                                    onClick={submit}
                                    data-testid="submit-offer"
                                >
                Submit
                                </Button>
                                {loading &&
                                <CircularProgress
                                    size={24}
                                    className={classes.finishProgress}
                                />
                                }
                            </form>
                        </Grid>
                    </Grid>
                </Content>

            </div>


    );
};

export default CreateOfferForm;
