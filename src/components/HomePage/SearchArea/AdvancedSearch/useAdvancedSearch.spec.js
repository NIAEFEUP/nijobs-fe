import { testHook } from "../../../../test-utils";
import useAdvancedSearch, { FIELD_OPTIONS, TECH_OPTIONS } from "./useAdvancedSearch";
import { INITIAL_JOB_TYPE, INITIAL_JOB_DURATION } from "../../../../reducers/searchOffersReducer";

describe("useAdvancedSearch", () => {
    let useAdvancedSearchProps;

    it("should return the correct props for job duration", () => {

        const showJobDurationSlider = false;
        const toggleShowJobDurationSlider = () => {};
        const setJobDuration = jest.fn();
        const minJobDuration = 0;
        const maxJobDuration = 1;

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                minJobDuration,
                maxJobDuration,
                setJobDuration,
                showJobDurationSlider,
                toggleShowJobDurationSlider,
            });
        });

        const {
            JobDurationSwitchProps,
            JobDurationCollapseProps,
            JobDurationSliderProps,
            JobDurationSliderText,
        } = useAdvancedSearchProps;
        expect(JobDurationSliderText).toBe("Job Duration - 0-1 month(s)");
        expect(JobDurationSwitchProps.checked).toBe(showJobDurationSlider);
        expect(JobDurationSwitchProps.onChange).toBe(toggleShowJobDurationSlider);
        expect(JobDurationCollapseProps.in).toBe(showJobDurationSlider);
        expect(JobDurationSliderProps.onChange).toBe(setJobDuration);
        expect(JobDurationSliderProps.value).toStrictEqual([minJobDuration, maxJobDuration]);

        JobDurationCollapseProps.onEnter();
        expect(setJobDuration).toHaveBeenCalledWith(null, [INITIAL_JOB_DURATION, INITIAL_JOB_DURATION + 1]);
    });

    it("should return the correct props for Fields Selector", () => {

        const fields = ["test"];
        const setFields = jest.fn();

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                fields,
                setFields,
            });
        });

        const { FieldsSelectorProps } = useAdvancedSearchProps;
        expect(FieldsSelectorProps.multiple).toBe(true);
        expect(FieldsSelectorProps.options).toEqual(FIELD_OPTIONS.map((option) => option.label));
        expect(FieldsSelectorProps.value).toEqual(fields);
        expect(FieldsSelectorProps).toHaveProperty("autocompleteProps");

        FieldsSelectorProps.onChange(null, fields);
        expect(setFields).toHaveBeenCalledWith(fields);
    });

    it("should return the correct props for Techs Selector", () => {

        const techs = ["test"];
        const setTechs = jest.fn();

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                techs,
                setTechs,
            });
        });

        const { TechsSelectorProps } = useAdvancedSearchProps;
        expect(TechsSelectorProps.multiple).toBe(true);
        expect(TechsSelectorProps.options).toEqual(TECH_OPTIONS.map((option) => option.label));
        expect(TechsSelectorProps.value).toEqual(techs);
        expect(TechsSelectorProps).toHaveProperty("autocompleteProps");

        TechsSelectorProps.onChange(null, techs);
        expect(setTechs).toHaveBeenCalledWith(techs);
    });

    it("should return the correct props for Job Type Selector", () => {

        const jobType = "test";
        const setJobType = jest.fn();

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                jobType,
                setJobType,
            });
        });

        const { JobTypeSelectorProps } = useAdvancedSearchProps;
        expect(JobTypeSelectorProps.value).toEqual(jobType);

        JobTypeSelectorProps.onChange(jobType);
        expect(setJobType).toHaveBeenCalledWith(jobType);
    });

    it("should return the correct props for reset button", () => {

        const showJobDurationSlider = false;
        const jobType = `${INITIAL_JOB_TYPE}a`;
        const fields = ["test"];
        const techs = ["test"];

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                showJobDurationSlider,
                jobType,
                fields,
                techs,
            });
        });

        const { ResetButtonProps } = useAdvancedSearchProps;
        expect(ResetButtonProps.disabled).toBe(false);
    });

    it("should return advancedOptionsActive when there are changes to the advanced fields", () => {

        // Initial Values - if this test fails remind yourself of checking if these are accurate
        let showJobDurationSlider = false;
        let jobType = INITIAL_JOB_TYPE;
        let fields = [];
        let techs = [];

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                showJobDurationSlider,
                jobType,
                fields,
                techs,
            });
        });

        let { advancedOptionsActive } = useAdvancedSearchProps;
        expect(advancedOptionsActive).toBe(false);

        showJobDurationSlider = true;
        jobType = INITIAL_JOB_TYPE;
        fields = [];
        techs = [];

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                showJobDurationSlider,
                jobType,
                fields,
                techs,
            });
        });

        ({ advancedOptionsActive } = useAdvancedSearchProps);
        expect(advancedOptionsActive).toBe(true);

        showJobDurationSlider = false;
        jobType = `${INITIAL_JOB_TYPE}a`;
        fields = [];
        techs = [];

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                showJobDurationSlider,
                jobType,
                fields,
                techs,
            });
        });

        ({ advancedOptionsActive } = useAdvancedSearchProps);
        expect(advancedOptionsActive).toBe(true);

        showJobDurationSlider = false;
        jobType = INITIAL_JOB_TYPE;
        fields = ["test"];
        techs = [];

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                showJobDurationSlider,
                jobType,
                fields,
                techs,
            });
        });

        ({ advancedOptionsActive } = useAdvancedSearchProps);
        expect(advancedOptionsActive).toBe(true);

        showJobDurationSlider = false;
        jobType = INITIAL_JOB_TYPE;
        fields = [];
        techs = ["test"];

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                showJobDurationSlider,
                jobType,
                fields,
                techs,
            });
        });

        ({ advancedOptionsActive } = useAdvancedSearchProps);
        expect(advancedOptionsActive).toBe(true);
    });

    it("should return a reset function that resets the fields", () => {
        const resetAdvancedSearchFields = jest.fn();
        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                setFields: () => {},
                setTechs: () => {},
                resetAdvancedSearchFields,
            });
        });

        const { resetAdvancedSearch } = useAdvancedSearchProps;
        resetAdvancedSearch();
        expect(resetAdvancedSearchFields).toHaveBeenCalledTimes(1);
    });
});
