/* eslint-disable react/prop-types */
import React from "react";
import AdvancedSearchMobile from "./AdvancedSearchMobile";
import JobOptions from "./JobOptions";
import { AdvancedSearchController, AdvancedSearchControllerContext } from "../SearchArea";
import useComponentController from "../../../../hooks/useComponentController";
import { INITIAL_JOB_DURATION, INITIAL_JOB_TYPE } from "../../../../reducers/searchOffersReducer";
import { fireEvent } from "@testing-library/dom";
import FieldOptions from "./FieldOptions";
import TechOptions from "./TechOptions";
import { render, screen } from "../../../../test-utils";

const AdvancedSearchWrapper = ({
    children, enableAdvancedSearchDefault, showJobDurationSlider, setShowJobDurationSlider, jobMinDuration = INITIAL_JOB_DURATION,
    jobMaxDuration = INITIAL_JOB_DURATION + 1, jobType = INITIAL_JOB_TYPE, setJobDuration, setJobType, fields = [], setFields,
    technologies = [], setTechs, resetAdvancedSearchFields, onSubmit, searchValue, searchOffers, onMobileClose, setSearchValue,
    submitForm,
}) => {
    const {
        ContextProvider,
        contextProviderProps,
    } = useComponentController(
        AdvancedSearchController,
        {
            enableAdvancedSearchDefault, showJobDurationSlider, setShowJobDurationSlider, jobMinDuration,
            jobMaxDuration, setJobDuration, jobType, setJobType, fields, setFields, technologies, setTechs,
            resetAdvancedSearchFields, onSubmit, searchValue, searchOffers, onMobileClose, setSearchValue,
            submitForm,
        },
        AdvancedSearchControllerContext
    );

    return (
        <ContextProvider {...contextProviderProps}>
            {children}
        </ContextProvider>
    );
};

describe("AdvancedSearchMobile", () => {
    describe("render", () => {

        it("should render a dialog title with a button to close", () => {
            render(
                <AdvancedSearchWrapper enableAdvancedSearchDefault>
                    <AdvancedSearchMobile />
                </AdvancedSearchWrapper>
            );

            expect(screen.getByText("Advanced Search")).toBeInTheDocument();
            expect(screen.getByRole("button", { name: "back" })).toBeInTheDocument();

        });

        it("should render a SearchBar", () => {
            render(
                <AdvancedSearchWrapper enableAdvancedSearchDefault>
                    <AdvancedSearchMobile />
                </AdvancedSearchWrapper>
            );

            expect(screen.getByLabelText("Search")).toBeInTheDocument();
        });

        it("should render a job selector with all job types", () => {

            render(
                <AdvancedSearchWrapper enableAdvancedSearchDefault>
                    <AdvancedSearchMobile />
                </AdvancedSearchWrapper>
            );

            fireEvent.mouseDown(screen.getByLabelText("Job Type"));
            expect(screen.getAllByRole("option")).toHaveLength(JobOptions.length);
            JobOptions.forEach(({ label: jobOption }) => {
                try {
                    expect(screen.getByRole("option", { name: jobOption })).toBeInTheDocument();
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error(`Could not find option: ${jobOption}`);
                    throw err;
                }
            });
        });

        it("should toggle job duration slider (on)", () => {
            const setShowJobDurationSliderMock = jest.fn();
            render(
                <AdvancedSearchWrapper
                    enableAdvancedSearchDefault
                    jobMinDuration={1}
                    jobMaxDuration={2}
                    showJobDurationSlider={false}
                    setShowJobDurationSlider={setShowJobDurationSliderMock}
                >
                    <AdvancedSearchMobile />
                </AdvancedSearchWrapper>
            );

            expect(screen.getByText("Job Duration - 1-2 month(s)")).not.toBeVisible();
            fireEvent.click(screen.getByLabelText("Filter Job Duration"));
            expect(setShowJobDurationSliderMock).toHaveBeenCalledWith(true);
            // Can't test that element is visible now (after toggling), since we can't emulate redux logic, wihtout having the whole tree,
            // So, I'll just assert that when showJobDurationSlider=true, it shows correctly in the next test
        });

        it("should toggle job duration slider (off)", () => {
            const setShowJobDurationSliderMock = jest.fn();
            render(
                <AdvancedSearchWrapper
                    enableAdvancedSearchDefault
                    jobMinDuration={1}
                    jobMaxDuration={2}
                    showJobDurationSlider={true}
                    setShowJobDurationSlider={setShowJobDurationSliderMock}
                >
                    <AdvancedSearchMobile />
                </AdvancedSearchWrapper>
            );


            expect(screen.getByText("Job Duration - 1-2 month(s)")).toBeVisible();
            fireEvent.click(screen.getByLabelText("Filter Job Duration"));
            expect(setShowJobDurationSliderMock).toHaveBeenCalledWith(false);
        });

        it("should render a fields selector with all field types", () => {

            render(
                <AdvancedSearchWrapper enableAdvancedSearchDefault>
                    <AdvancedSearchMobile />
                </AdvancedSearchWrapper>
            );

            fireEvent.mouseDown(screen.getByLabelText("Fields", { selector: "input" }));
            expect(screen.getAllByRole("option")).toHaveLength(Object.keys(FieldOptions).length);
            Object.values(FieldOptions).forEach((fieldOption) => {
                try {
                    expect(screen.getByRole("option", { name: fieldOption })).toBeInTheDocument();
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error(`Could not find option: ${fieldOption}`);
                    throw err;
                }
            });
        });

        it("should render a technologies selector with all technology types", () => {

            render(
                <AdvancedSearchWrapper enableAdvancedSearchDefault>
                    <AdvancedSearchMobile />
                </AdvancedSearchWrapper>
            );

            fireEvent.mouseDown(screen.getByLabelText("Technologies", { selector: "input" }));
            expect(screen.getAllByRole("option")).toHaveLength(Object.keys(TechOptions).length);
            Object.values(TechOptions).forEach((technologyOption) => {
                try {
                    expect(screen.getByRole("option", { name: technologyOption })).toBeInTheDocument();
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error(`Could not find option: ${technologyOption}`);
                    throw err;
                }
            });
        });

        it("should disable reset button if no advanced field is set", () => {

            render(
                <AdvancedSearchWrapper
                    enableAdvancedSearchDefault
                >
                    <AdvancedSearchMobile />
                </AdvancedSearchWrapper>
            );

            expect(screen.getByRole("button", { name: "Reset" })).toBeDisabled();
        });

        it("should enable reset button if some advanced field is set", () => {

            render(
                <AdvancedSearchWrapper
                    enableAdvancedSearchDefault
                    fields={[Object.keys(FieldOptions)[0]]}
                >
                    <AdvancedSearchMobile />
                </AdvancedSearchWrapper>
            );

            expect(screen.getByRole("button", { name: "Reset" })).not.toBeDisabled();
        });
    });

    describe("interaction", () => {

        it("should change fields when selecting options", () => {

            const setFieldsMock = jest.fn();

            render(
                <AdvancedSearchWrapper
                    enableAdvancedSearchDefault
                    fields={[Object.keys(FieldOptions)[0]]}
                    setFields={setFieldsMock}
                >
                    <AdvancedSearchMobile />
                </AdvancedSearchWrapper>
            );

            expect(screen.getAllByTestId("chip-option", {})).toHaveLength(1);
            expect(screen.getByTestId("chip-option", { name: Object.keys(FieldOptions)[0] })).toBeInTheDocument();

            fireEvent.mouseDown(screen.getByLabelText("Fields", { selector: "input" }));
            fireEvent.click(screen.getByRole("option", { name: Object.values(FieldOptions)[1] }));
            expect(setFieldsMock).toHaveBeenNthCalledWith(1, Object.keys(FieldOptions).slice(0, 2));

            // The state isn't actaully changing in this test. So, in the following scenario,
            // the only selected value is actually FieldOptions[0]
            fireEvent.mouseDown(screen.getByLabelText("Fields", { selector: "input" }));
            fireEvent.click(screen.getByRole("option", { name: Object.values(FieldOptions)[0] }));
            expect(setFieldsMock).toHaveBeenNthCalledWith(2, []);

        });

        it("should change technologies when selecting options", () => {

            const setTechsMock = jest.fn();

            render(
                <AdvancedSearchWrapper
                    enableAdvancedSearchDefault
                    technologies={[Object.keys(TechOptions)[0]]}
                    setTechs={setTechsMock}
                >
                    <AdvancedSearchMobile />
                </AdvancedSearchWrapper>
            );

            expect(screen.getAllByTestId("chip-option", {})).toHaveLength(1);
            expect(screen.getByTestId("chip-option", { name: Object.keys(TechOptions)[0] })).toBeInTheDocument();

            fireEvent.mouseDown(screen.getByLabelText("Technologies", { selector: "input" }));
            fireEvent.click(screen.getByRole("option", { name: Object.values(TechOptions)[1] }));
            expect(setTechsMock).toHaveBeenNthCalledWith(1, Object.keys(TechOptions).slice(0, 2));

            // The state isn't actaully changing in this test. So, in the following scenario,
            // the only selected value is actually TechOptions[0]
            fireEvent.mouseDown(screen.getByLabelText("Technologies", { selector: "input" }));
            fireEvent.click(screen.getByRole("option", { name: Object.values(TechOptions)[0] }));
            expect(setTechsMock).toHaveBeenNthCalledWith(2, []);

        });

        it("should call resetAdvancedSearch when Reset button is clicked", () => {
            const resetFn = jest.fn();

            render(
                <AdvancedSearchWrapper
                    enableAdvancedSearchDefault
                    setSearchValue={() => {}}
                    setJobType={() => {}}
                    setJobDuration={() => {}}
                    setShowJobDurationSlider={() => {}}
                    setFields={() => {}}
                    setTechs={() => {}}
                    resetAdvancedSearchFields={resetFn}
                    technologies={[Object.keys(TechOptions)[0]]} // Must have something set to be able to click reset
                >
                    <AdvancedSearchMobile />
                </AdvancedSearchWrapper>
            );

            fireEvent.click(screen.getByRole("button", { name: "Reset" }));

            expect(resetFn).toHaveBeenCalledTimes(1);

        });
    });

});
