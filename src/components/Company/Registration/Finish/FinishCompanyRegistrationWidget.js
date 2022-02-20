import React, { useContext, useCallback } from "react";
import {
    CardActions,
    CardContent,
    CardHeader,
    DialogContent,
    Link,
    MobileStepper,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@material-ui/core";
import LogoUploadForm, { useLogoUpload } from "./LogoUploadForm";
import ContactsForm, { useContacts } from "./ContactsForm";
import BioForm, { useBio } from "./BioForm";

import { yupResolver } from "@hookform/resolvers/yup";
import FinishCompanyRegistrationSchema from "./FinishCompanyRegistrationSchema";
import { useForm } from "react-hook-form";
import getCroppedImg from "../../../utils/image/cropImage";
import { completeRegistration } from "../../../../services/accountService";
import ReviewForm from "./ReviewForm";
import { useMobile } from "../../../../utils/media-queries";
import clsx from "clsx";
import BackButton from "./BackButton";
import NextButton from "./NextButton";
import useSession from "../../../../hooks/useSession";
import useFinishCompanyRegistrationStyles from "./finishCompanyRegistrationStyles";
import Constants from "../../../../utils/Constants";


function getStepContent(step) {
    switch (step) {
        case 0:
            return <LogoUploadForm />;
        case 1:
            return <BioForm />;
        case 2:
            return <ContactsForm />;
        case 3:
            return <ReviewForm />;
        default:
            return (
                <Typography>
                    There has been an error. Please report this to
                    {" "}
                    <Link color="secondary" href={`mailto:${Constants.CONTACT_US_EMAIL}`}>
                        {Constants.CONTACT_US_EMAIL}
                    </Link>
                </Typography>
            );
    }
}

function getSteps() {
    return ["Set your profile picture", "Set your company's description", "Set your contacts", "Review Information"];
}

export const FinishCompanyRegistrationControllerContext = React.createContext();
export const FinishCompanyRegistrationController = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [submissionErrors, setSubmissionErrors] = React.useState(null);
    const [succeeded, setSucceeded] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const steps = getSteps();

    const { handleSubmit, formState: { errors }, control, watch, register, getValues } = useForm({
        mode: "all",
        resolver: yupResolver(FinishCompanyRegistrationSchema),
        reValidateMode: "onChange",
        defaultValues: {
            logo: undefined,
            bio: "",
            contacts: [{ value: "" }],
        },
    });

    const logoUploadOptions = useLogoUpload({ control, watch });
    const bioOptions = useBio({ control });
    const contactsOptions = useContacts({ control });

    const submit = useCallback(
        (data) => {
            setLoading(true);
            const { bio, contacts } = data;
            getCroppedImg(
                logoUploadOptions.logoPreview,
                logoUploadOptions.croppedAreaPixels,
                0
            ).then((croppedImage) => completeRegistration({ logo: croppedImage, bio, contacts: contacts.map(({ value }) => value) }))
                .then(() => {
                    setSucceeded(true);
                    setLoading(false);
                })
                .catch((err) => {
                    setSubmissionErrors(err);
                    setLoading(false);
                });
        },
        [logoUploadOptions.croppedAreaPixels, logoUploadOptions.logoPreview],
    );

    const handleNext = useCallback(() => {
        setActiveStep((activeStep) => {
            if (activeStep === steps.length - 1) return activeStep;
            else return activeStep + 1;
        });
    }, [steps.length]);

    const handleBack = useCallback(() => {
        setActiveStep((activeStep) => {
            if (activeStep === 0) return activeStep;
            else return activeStep - 1;
        });
    }, []);

    const stepValidator = useCallback((step) => {
        switch (step) {
            case 0:
                return !errors.logo && (logoUploadOptions.validateStep ? logoUploadOptions.validateStep() : true);
            case 1:
                return !errors.bio && (bioOptions.validateStep ? bioOptions.validateStep() : true);
            case 2:
                return !errors.contacts && (contactsOptions.validateStep ? contactsOptions.validateStep() : true);
            default:
                return true;
        }
    }, [bioOptions, contactsOptions, errors.bio, errors.contacts, errors.logo, logoUploadOptions]);

    const canAdvanceStep = stepValidator(activeStep);

    const { data } = useSession();
    const companyName = data?.company?.name;

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
                getValues,
                submit: handleSubmit(submit),
                logoUploadOptions,
                bioOptions,
                contactsOptions,
                succeeded,
                submissionErrors,
                companyName,
                loading,
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
        succeeded,
        loading,
    } = useContext(FinishCompanyRegistrationControllerContext);

    const isMobile = useMobile();
    const classes = useFinishCompanyRegistrationStyles(isMobile)();

    const Content = isMobile ? DialogContent : CardContent;

    return (
        <form
            onSubmit={submit}
            aria-label="Company Registration Finish Form"
            className={classes.form}
        >
            <div className={classes.formCard}>
                <CardHeader
                    title={
                        !isMobile &&
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
                <Content className={classes.formContent}>
                    {getStepContent(activeStep)}
                </Content>
                {!succeeded &&
                    <CardActions className={clsx(classes.buttonsArea, { [classes.buttonsAreaMobile]: isMobile })}>
                        {isMobile ?
                            <MobileStepper
                                variant="dots"
                                steps={steps.length}
                                position="static"
                                activeStep={activeStep}
                                nextButton={
                                    <NextButton
                                        loading={loading}
                                        onClick={activeStep === steps.length - 1 ? submit : handleNext}
                                        disabled={!canAdvanceStep || loading}
                                        type="button"
                                        label={activeStep === steps.length - 1 ? "Finish" : "Next"}
                                    />
                                }
                                backButton={<BackButton disabled={activeStep === 0 || loading} onClick={handleBack} />}
                            />
                            :
                            <>
                                <BackButton disabled={activeStep === 0 || loading} onClick={handleBack} />
                                <NextButton
                                    loading={loading}
                                    onClick={activeStep === steps.length - 1 ? submit : handleNext}
                                    disabled={!canAdvanceStep || loading}
                                    type="button"
                                    label={activeStep === steps.length - 1 ? "Finish" : "Next"}
                                />
                            </>
                        }
                    </CardActions>
                }
            </div>
        </form>
    );
};

export default FinishCompanyRegistrationWidget;
