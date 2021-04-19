import React, { useCallback } from "react";
import FinishCompanyRegistrationWidget from "../components/Company/Registration/Finish/FinishCompanyRegistrationWidget";

function getSteps() {
    return ["Set your profile picture", "Set your company's description", "Set your contacts"];
}

export const FinishCompanyRegistrationPageControllerContext = React.createContext();
export const FinishCompanyRegistrationPageController = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, []);

    const handleBack = useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }, []);

    return {
        controllerOptions: {
            initialValue: {
                activeStep,
                steps,
                handleNext,
                handleBack,
            },
        },
    };
};

const FinishCompanyRegistrationPage = () => (
    <>
        <FinishCompanyRegistrationWidget />
    </>
);

export default FinishCompanyRegistrationPage;
