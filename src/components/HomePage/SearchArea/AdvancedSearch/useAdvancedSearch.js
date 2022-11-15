import { useCallback } from "react";
import useToggle from "../../../../hooks/useToggle";
import { INITIAL_JOB_DURATION, INITIAL_JOB_TYPE, JOB_MAX_DURATION } from "../../../../reducers/searchOffersReducer";
import useSearchAreaStyles from "../searchAreaStyle";
import useTechSelector from "../../../utils/offers/useTechSelector";
import useFieldSelector from "../../../utils/offers/useFieldSelector";

export default ({
    enableAdvancedSearchDefault,
    jobMinDuration,
    jobMaxDuration,
    setJobDuration,
    showJobDurationSlider,
    setShowJobDurationSlider,
    jobType,
    setJobType,
    fields,
    setFields,
    technologies,
    setTechs,
    resetAdvancedSearchFields,
    showHidden,
    setShowHidden,
}) => {

    const jobDuration = [jobMinDuration, jobMaxDuration];

    const jobMaxDurationParsed = `${jobMaxDuration}${jobMaxDuration === JOB_MAX_DURATION ? "+" : ""}`;
    const JobDurationSliderText = jobMinDuration === jobMaxDuration ?
        `Job Duration: ${jobMaxDurationParsed} ${jobMinDuration === 1 ? "month" : "months"}`
        : `Job Duration: ${jobMinDuration} - ${jobMaxDurationParsed} months`;

    const JobDurationSwitchLabel = "Filter Job Duration";

    const JobHiddenSwitchLabel = "Show Hidden Offers";

    const [advancedOptions, toggleAdvancedOptions] = useToggle(enableAdvancedSearchDefault);

    const JobTypeSelectorProps = {
        margin: "normal",
        id: "job_type",
        select: true,
        label: "Job Type",
        value: jobType ? jobType : "",
        onChange: setJobType,
    };

    const toggleShowJobDurationSlider = useCallback(() => {
        setShowJobDurationSlider(!showJobDurationSlider);
    }, [setShowJobDurationSlider, showJobDurationSlider]);

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

    const FieldsSelectorProps = useFieldSelector(fields, setFields);
    const TechsSelectorProps = useTechSelector(technologies, setTechs);

    const toggleShowHidden = useCallback(() => {
        setShowHidden(!showHidden);
    }, [setShowHidden, showHidden]);

    const ShowHiddenSwitchProps = {
        checked: showHidden,
        onChange: toggleShowHidden,
        value: "filterShowHiddenOffers",
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
        JobHiddenSwitchLabel,
        JobDurationSliderProps,
        JobDurationSliderText,
        ResetButtonProps,
        ShowHiddenSwitchProps,
    };
};
