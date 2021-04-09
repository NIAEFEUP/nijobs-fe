import { testHook, act } from "../../../../test-utils";
import useAdvancedSearch from "./useAdvancedSearch";
import FIELD_OPTIONS from "./FieldOptions";
import TECH_OPTIONS from "./TechOptions";
import { INITIAL_JOB_TYPE, INITIAL_JOB_DURATION } from "../../../../reducers/searchOffersReducer";

describe("useAdvancedSearch", () => {
    let useAdvancedSearchProps;

    it("should return the correct props for job duration", () => {

        const showJobDurationSlider = false;
        const setShowJobDurationSlider = () => {};
        const setJobDuration = jest.fn();
        const jobMinDuration = 0;
        const jobMaxDuration = 1;

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                jobMinDuration,
                jobMaxDuration,
                setJobDuration,
                showJobDurationSlider,
                setShowJobDurationSlider,
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
        expect(JobDurationCollapseProps.in).toBe(showJobDurationSlider);
        expect(JobDurationSliderProps.onChange).toBe(setJobDuration);
        expect(JobDurationSliderProps.value).toStrictEqual([jobMinDuration, jobMaxDuration]);

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
        expect(FieldsSelectorProps.options).toEqual(Object.keys(FIELD_OPTIONS));
        expect(FieldsSelectorProps.value).toEqual(fields);
        expect(FieldsSelectorProps).toHaveProperty("autocompleteProps");

        FieldsSelectorProps.onChange(null, fields);
        expect(setFields).toHaveBeenCalledWith(fields);
    });

    it("should return the correct props for Techs Selector", () => {

        const technologies = ["test"];
        const setTechs = jest.fn();

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                technologies,
                setTechs,
            });
        });

        const { TechsSelectorProps } = useAdvancedSearchProps;
        expect(TechsSelectorProps.multiple).toBe(true);
        expect(TechsSelectorProps.options).toEqual(Object.keys(TECH_OPTIONS));
        expect(TechsSelectorProps.value).toEqual(technologies);
        expect(TechsSelectorProps).toHaveProperty("autocompleteProps");

        TechsSelectorProps.onChange(null, technologies);
        expect(setTechs).toHaveBeenCalledWith(technologies);
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
        const technologies = ["test"];

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                showJobDurationSlider,
                jobType,
                fields,
                technologies,
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
        let technologies = [];

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                showJobDurationSlider,
                jobType,
                fields,
                technologies,
            });
        });

        let { advancedOptionsActive } = useAdvancedSearchProps;
        expect(advancedOptionsActive).toBe(false);

        showJobDurationSlider = true;
        jobType = INITIAL_JOB_TYPE;
        fields = [];
        technologies = [];

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                showJobDurationSlider,
                jobType,
                fields,
                technologies,
            });
        });

        ({ advancedOptionsActive } = useAdvancedSearchProps);
        expect(advancedOptionsActive).toBe(true);

        showJobDurationSlider = false;
        jobType = `${INITIAL_JOB_TYPE}a`;
        fields = [];
        technologies = [];

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                showJobDurationSlider,
                jobType,
                fields,
                technologies,
            });
        });

        ({ advancedOptionsActive } = useAdvancedSearchProps);
        expect(advancedOptionsActive).toBe(true);

        showJobDurationSlider = false;
        jobType = INITIAL_JOB_TYPE;
        fields = ["test"];
        technologies = [];

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                showJobDurationSlider,
                jobType,
                fields,
                technologies,
            });
        });

        ({ advancedOptionsActive } = useAdvancedSearchProps);
        expect(advancedOptionsActive).toBe(true);

        showJobDurationSlider = false;
        jobType = INITIAL_JOB_TYPE;
        fields = [];
        technologies = ["test"];

        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                showJobDurationSlider,
                jobType,
                fields,
                technologies,
            });
        });

        ({ advancedOptionsActive } = useAdvancedSearchProps);
        expect(advancedOptionsActive).toBe(true);
    });

    it("should return a reset function that resets the fields", async () => {
        const resetAdvancedSearchFields = jest.fn();
        testHook(() => {
            useAdvancedSearchProps = useAdvancedSearch({
                setFields: () => {},
                setTechs: () => {},
                resetAdvancedSearchFields,
            });
        });

        const { resetAdvancedSearch } = useAdvancedSearchProps;
        await act(() => {
            resetAdvancedSearch();
        });
        expect(resetAdvancedSearchFields).toHaveBeenCalledTimes(1);
    });
});
