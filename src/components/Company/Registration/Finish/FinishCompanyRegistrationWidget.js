import React, { useContext, useCallback } from "react";
import {
    CardActions,
    CardContent,
    CardHeader,
    DialogContent,
    Link,
    makeStyles,
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

const useStyles = (isMobile) => makeStyles((theme) => ({
    form: {
        width: "100%",
        flexGrow: 1,
    },
    formCard: {
        padding: isMobile ? theme.spacing(0, 1) : theme.spacing(10),
        paddingBottom: !isMobile && theme.spacing(2),
        display: isMobile && "flex",
        flexDirection: isMobile &&  "column",
        height: isMobile && "100%",
    },
    formContent: {
        display: !isMobile && "flex",
        flexDirection: !isMobile && "column",
        alignItems: "center",
    },
    buttonsArea: {
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(3, 2),
        paddingTop: isMobile && 0,
    },
    buttonsAreaMobile: {
        position: "sticky",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        justifyContent: "center",
        paddingBottom: 0,
        "& > *": {
            backgroundColor: "white",
            width: "100%",
            paddingBottom: theme.spacing(4),
        },
    },
}));

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
                    <Link color="secondary" href="mailto:ni@aefeup.pt">ni@aefeup.pt</Link>
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
            const { bio, contacts } = data;
            getCroppedImg(
                logoUploadOptions.logoPreview,
                logoUploadOptions.croppedAreaPixels,
                0
            ).then((croppedImage) => {
                completeRegistration({ logo: croppedImage, bio, contacts });
                // TODO HANDLE SUCCESS/ERROR (return this call as promise, use .then and .catch afterwards)
            });
        },
        [logoUploadOptions.croppedAreaPixels, logoUploadOptions.logoPreview],
    );

    const handleNext = useCallback(() => {
        if (activeStep >= steps.length - 1) setActiveStep(steps.length);
        else setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, [activeStep, steps.length]);

    const handleBack = useCallback(() => {
        if (activeStep === 0) return;
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }, [activeStep]);


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

    const classes = useStyles(useMobile())();

    const isMobile = useMobile();

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
                <CardActions className={clsx(classes.buttonsArea, { [classes.buttonsAreaMobile]: isMobile })}>
                    {isMobile ?
                        <MobileStepper
                            variant="dots"
                            steps={steps.length}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <NextButton
                                    onClick={handleNext}
                                    disabled={!canAdvanceStep}
                                    type={activeStep === steps.length  ? "submit" : "button"}
                                    label={activeStep === steps.length - 1 ? "Finish" : "Next"}
                                />
                            }
                            backButton={<BackButton disabled={activeStep === 0} onClick={handleBack} />}
                        />
                        :
                        <>
                            <BackButton disabled={activeStep === 0} onClick={handleBack} />
                            <NextButton
                                onClick={handleNext}
                                disabled={!canAdvanceStep}
                                type={activeStep === steps.length  ? "submit" : "button"}
                                label={activeStep === steps.length - 1 ? "Finish" : "Next"}
                            />
                        </>
                    }
                </CardActions>
            </div>
        </form>
    );
};

export default FinishCompanyRegistrationWidget;
