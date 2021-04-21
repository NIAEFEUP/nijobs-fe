import React, { useContext, useCallback } from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Step,
    StepLabel,
    Stepper,
} from "@material-ui/core";
import LogoUploadForm, { useLogoUpload } from "./LogoUploadForm";
import ContactsForm, { useContacts } from "./ContactsForm";
import BioForm, { useBio } from "./BioForm";

import { yupResolver } from "@hookform/resolvers";
import FinishCompanyRegistrationSchema from "./FinishCompanyRegistrationSchema";
import { useForm } from "react-hook-form";
import getCroppedImg from "../../../utils/image/cropImage";
import { completeRegistration } from "../../../../services/accountService";


function getStepContent(step) {
    switch (step) {
        case 0:
            return <LogoUploadForm />;
        case 1:
            return <BioForm />;
        case 2:
            return <ContactsForm />;
        default:
            return "Unknown step";
    }
}

function getSteps() {
    return ["Set your profile picture", "Set your company's description", "Set your contacts"];
}

export const FinishCompanyRegistrationControllerContext = React.createContext();
export const FinishCompanyRegistrationController = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const { handleSubmit, errors, control, watch, register } = useForm({
        mode: "onChange",
        resolver: yupResolver(FinishCompanyRegistrationSchema),
        reValidateMode: "onChange",
        shouldUnregister: false,
    });

    const logoUploadOptions = useLogoUpload();
    const contactOptions =  useContacts();
    const bioOptions = useBio();


    const submit = useCallback(
        () => {
            getCroppedImg(
                logoUploadOptions.logoPreview,
                logoUploadOptions.croppedAreaPixels,
                0
            ).then((croppedImage) => {
                completeRegistration(croppedImage, contactOptions.contacts, bioOptions.bio);
            });
        },
        [bioOptions.bio, contactOptions.contacts, logoUploadOptions.croppedAreaPixels, logoUploadOptions.logoPreview],
    );

    const handleNext = useCallback(() => {
        if (activeStep === steps.length - 1) submit();
        else setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, [activeStep, steps.length, submit]);

    const handleBack = useCallback(() => {
        if (activeStep === 0) return;
        setActiveStep((prevActiveStep) => prevActiveStep - 1); // TODO HANDLE EDGE CASES
    }, [activeStep]);


    const stepValidator = (step) => {
        switch (step) {
            case 0:
                return logoUploadOptions.validateStep ? logoUploadOptions.validateStep() : true;
            case 1:
                return bioOptions.validateStep ? bioOptions.validateStep() : true;
            case 2:
                return contactOptions.validateStep ? contactOptions.validateStep() : true;

            default:
                return true;
        }
    };
    const canAdvanceStep = Object.keys(errors).length === 0 && stepValidator(activeStep);
    return {
        controllerOptions: {
            initialValue: {
                activeStep,
                steps,
                handleNext,
                canAdvanceStep,
                handleBack,
                control,
                register,
                errors,
                watch,
                submit: handleSubmit(submit),
                ...logoUploadOptions,
                ...bioOptions,
                ...contactOptions,
            },
        },
    };
};

const FinishCompanyRegistrationWidget = () => {

    const {
        activeStep,
        steps,
        handleNext,
        handleBack,
        submit,
        canAdvanceStep,
    } = useContext(FinishCompanyRegistrationControllerContext);

    return (
        <form
            onSubmit={submit}
            aria-label="Company Registration Finish Form"
        >
            <Card>
                <CardHeader
                    title={
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    }
                />
                <CardContent>
                    {getStepContent(activeStep)}
                </CardContent>
                <CardActions>
                    <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            type="button"
                        >
                        Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            disabled={!canAdvanceStep}
                            type={activeStep === steps.length - 1 ? "submit" : "button"}
                        >
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </form>
    );
};

export default FinishCompanyRegistrationWidget;
