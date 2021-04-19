import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    makeStyles,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { FinishCompanyRegistrationPageControllerContext } from "../../../../pages/FinishCompanyRegistrationPage";


const useStyles = makeStyles(() => ({
    logoPreview: {
        width: "100%",
    },
}));

const LogoPreview = ({ img }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia
                src={img}
                component="img"
                title="logo-preview"
                className={classes.logoPreview}
            />
        </Card>
    );
};

const LogoUploadForm = () => {

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return () => {};
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    };

    return (
        <Grid container>
            <Grid item xs={12} sm={5}>
                {selectedFile &&  <LogoPreview img={preview} /> }
            </Grid>
            <Grid item xs={12} sm="auto">
                <input
                    hidden
                    accept=".png,.jpg,.jpeg"
                    id="raised-button-file"
                    type="file"
                    onChange={onSelectFile}
                />
                <label htmlFor="raised-button-file">
                    <Button
                        variant="contained"
                        component="span"
                        color="primary"
                        startIcon={<CloudUpload />}
                    >
                    Upload
                    </Button>
                </label>
            </Grid>
        </Grid>
    );
};
const BioForm = () => {
    const placeholder = "Tell us about the company. \n\
i.e. What do you do? What are some key products, services or projects? Which techs do you use?";
    return (
        <Grid container>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Company Bio"
                    multiline
                    placeholder={placeholder}
                    id="bio"
                    name="bio"
                />
            </Grid>
        </Grid>
    );
};
const ContactsForm = () => (
    <div>constacts form</div>
);

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
const FinishCompanyRegistrationWidget = () => {

    const { activeStep, steps, handleNext, handleBack } = useContext(FinishCompanyRegistrationPageControllerContext);

    return (
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
                {activeStep === steps.length ? (
                    <div>
                        <Typography>
                    All steps completed - you&apos;re finished
                        </Typography>
                    </div>
                ) : (
                    <>
                        {getStepContent(activeStep)}
                    </>
                )}
            </CardContent>
            <CardActions>
                <div>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                    >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                </div>
            </CardActions>
        </Card>
    );
};

export default FinishCompanyRegistrationWidget;
