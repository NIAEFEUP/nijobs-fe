import React, { useCallback } from "react";
import useToggle from "../../../../hooks/useToggle";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { TextField } from "@material-ui/core";
import { INITIAL_JOB_DURATION, INITIAL_JOB_TYPE } from "../../../../reducers/searchOffersReducer";
import useSearchAreaStyles from "../searchAreaStyle";

import FIELD_OPTIONS from "./FieldOptions";
import TECH_OPTIONS from "./TechOptions";


// eslint-disable-next-line react/display-name
const RenderInput = (label) => (params) => (
    <TextField
        {...params}
        variant="standard"
        margin="normal"
        fullWidth
        label={label}
    />
);

export default ({
    enableAdvancedSearchDefault,
    jobMinDuration,
    jobMaxDuration,
    setJobDuration,
    showJobDurationSlider,
    toggleShowJobDurationSlider,
    jobType,
    setJobType,
    fields,
    setFields,
    technologies,
    setTechs,
    resetAdvancedSearchFields,
}) => {

    const jobDuration = [jobMinDuration, jobMaxDuration];

    const JobDurationSliderText = `Job Duration - ${jobMinDuration}-${jobMaxDuration} month(s)`;

    const JobDurationSwitchLabel = "Filter Job Duration";

    const [advancedOptions, toggleAdvancedOptions] = useToggle(enableAdvancedSearchDefault);

    const JobTypeSelectorProps = {
        margin: "normal",
        id: "job_type",
        select: true,
        label: "Job Type",
        value: jobType ? jobType : "",
        onChange: setJobType,
    };

    const JobDurationSwitchProps = {
        checked: showJobDurationSlider,
        onChange: toggleShowJobDurationSlider,
        value: "filterJobDuration",
    };

    const JobDurationCollapseProps = {
        in: showJobDurationSlider,
        onEnter: useCallback(() => setJobDuration(null, [INITIAL_JOB_DURATION, INITIAL_JOB_DURATION + 1]), [setJobDuration]),
        classes: { wrapperInner: useSearchAreaStyles().advancedSearchJobDuration },
    };

    const JobDurationSliderProps = {
        valueLabelDisplay: "auto",
        value: jobDuration,
        name: "jobDuration",
        min: 1,
        max: 12,
        step: 1,
        onChange: setJobDuration,
    };

    const FieldsAutocompleteProps = {
        multiple: true,
        renderInput: RenderInput("Fields"),
        options: Object.keys(FIELD_OPTIONS), // TODO Make this the same as API
        id: "fields-selector",
        getOptionLabel: (option) => FIELD_OPTIONS[option],
        onChange: useCallback((e, fields) => fields && setFields(fields), [setFields]),
        value: fields,
    };
    const fieldsAutocompleteProps = useCallback(useAutocomplete({ ...FieldsAutocompleteProps }), [FieldsAutocompleteProps]);

    const FieldsSelectorProps = {
        ...FieldsAutocompleteProps,
        autocompleteProps: fieldsAutocompleteProps,
    };

    const TechsAutocompleteProps = {
        multiple: true,
        renderInput: RenderInput("Technologies"),
        id: "technologies-selector",
        options: Object.keys(TECH_OPTIONS), // TODO Make this the same as API
        getOptionLabel: (option) => TECH_OPTIONS[option],
        onChange: useCallback((e, technologies) => technologies && setTechs(technologies), [setTechs]),
        value: technologies,
    };

    const techsAutocompleteProps = useCallback(useAutocomplete({ ...TechsAutocompleteProps }), [TechsAutocompleteProps]);

    const TechsSelectorProps = {
        ...TechsAutocompleteProps,
        autocompleteProps: techsAutocompleteProps,
    };


    const advancedOptionsActive = showJobDurationSlider
    || (jobType !== INITIAL_JOB_TYPE)
    || fields.length !== 0
    || technologies.length !== 0;

    const ResetButtonProps = {
        disabled: !advancedOptionsActive,
    };

    const resetAdvancedSearch = () => {

        // Clears the autocomplete and handles the internal state -- CONSISTENCY!!!
        FieldsSelectorProps.autocompleteProps.getClearProps().onClick();
        TechsSelectorProps.autocompleteProps.getClearProps().onClick();

        resetAdvancedSearchFields();
    };

    return {
        advancedOptions,
        advancedOptionsActive,
        toggleAdvancedOptions,
        resetAdvancedSearch,
        FieldsSelectorProps,
        TechsSelectorProps,
        JobTypeSelectorProps,
        JobDurationSwitchProps,
        JobDurationCollapseProps,
        JobDurationSwitchLabel,
        JobDurationSliderProps,
        JobDurationSliderText,
        ResetButtonProps,
    };
};
