import React, { useState } from "react";
import PropTypes from "prop-types";
import useForm from "../hooks/useForm";
import * as yup from "yup";
import { connect } from "react-redux";
import {
    TextField,
    makeStyles,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Link,
    FormHelperText,
} from "@material-ui/core";

import {
    CompanyApplicationConstants,
    ValidationReasons,
    generateValidationRule,
} from "../components/Apply/Company/CompanyApplicationUtils";

const CompanyApplicationSchema = yup.object().shape({
    email: yup.string()
        .required(ValidationReasons.REQUIRED)
        .email(ValidationReasons.EMAIL),
    password: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(...generateValidationRule("password", "minLength", ValidationReasons.TOO_SHORT)),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    motivation: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(...generateValidationRule("motivation", "minLength", ValidationReasons.TOO_SHORT))
        .max(...generateValidationRule("motivation", "maxLength", ValidationReasons.TOO_LONG)),
    companyName: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(...generateValidationRule("companyName", "minLength", ValidationReasons.TOO_SHORT))
        .max(...generateValidationRule("companyName", "maxLength", ValidationReasons.TOO_LONG)),
});

import { MainMask } from "../components/HomePage/MainMask";
import useToggle from "../hooks/useToggle";
import { submitCompanyApplication } from "../services/companyApplicationService";
import { setCompanyApplicationSubmissionError } from "../actions/companyApplicationActions";
import ApplicationInfoDialog from "../components/Apply/Company/ApplicationInfoDialog";
import ApplicationConfirmation from "../components/Apply/Company/ApplicationConfirmation";
import CenteredCard from "../components/HomePage/CenteredCard";


const useStyles = makeStyles((theme) => ({
    form: {
        width: "60%",
    },
    formCard: {
        padding: theme.spacing(10),
        paddingBottom: theme.spacing(2),
    },
    formContent: {
        display: "flex",
        flexDirection: "column",
    },
    buttonsArea: {
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(3, 2),
    },
    motivation: {
        marginTop: theme.spacing(5),
    },
}));

const CompanyApplicationPage = ({ submitCompanyApplication, submittingApplication,
    submissionErrors, setCompanyApplicationSubmissionError }) => {

    const { register, handleSubmit, reset, errors, watch } = useForm({
        mode: "onBlur",
        validationSchema: CompanyApplicationSchema,
        reValidateMode: "onChange",
    });

    const [errorCleared, setErrorCleared] = useState(true);

    const onSubmit = async (data) => {
        setErrorCleared(false);
        if (await submitCompanyApplication(data))
            toggleConfirmationModal();
    };

    const classes = useStyles();

    const motivation = watch("motivation") || "";

    const [showWhyModal, toggleWhyModal] = useToggle(false);
    const [showConfirmationModal, toggleConfirmationModal] = useToggle(false);

    const openWhyModal = (e) => {
        e.preventDefault();
        toggleWhyModal();
    };

    const resetCompanyApplicationSubmissionError = () => {
        if (!errorCleared) {
            setCompanyApplicationSubmissionError([]);
            setErrorCleared(true);
        }
    };

    return (
        <React.Fragment>
            <MainMask/>
            <CenteredCard>
                {showConfirmationModal ?
                    <ApplicationConfirmation open={showConfirmationModal} />
                    :
                    <React.Fragment>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={classes.form}
                        >
                    make me a company application form component
                            <Card className={classes.formCard}>
                                <CardHeader
                                    title="Company Application"
                                    subheader={
                                        <Link
                                            href=""
                                            onClick={openWhyModal}
                                            variant="body2"
                                        >
                                    Why do I need to apply?
                                        </Link>
                                    }
                                />
                                <CardContent className={classes.formContent}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        error={!!errors.email}
                                        inputRef={register}
                                        onChange={resetCompanyApplicationSubmissionError}
                                        helperText={errors.email ? errors.email.message : <span/>}
                                        margin="dense"
                                    />
                                    <TextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        error={!!errors.password}
                                        inputRef={register}
                                        onChange={resetCompanyApplicationSubmissionError}

                                        helperText={errors.password ? errors.password.message : <span/>}
                                        margin="dense"
                                    />
                                    <TextField
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        error={!!errors.confirmPassword}
                                        inputRef={register}
                                        helperText={errors.confirmPassword ? errors.confirmPassword.message : <span/>}
                                        margin="dense"
                                    />
                                    <TextField
                                        label="Company Name"
                                        name="companyName"
                                        error={!!errors.companyName}
                                        inputRef={register}
                                        onChange={resetCompanyApplicationSubmissionError}
                                        helperText={errors.companyName ? errors.companyName.message : <span/>}
                                        margin="dense"
                                    />
                                    <TextField
                                        className={classes.motivation}
                                        key="Motivation"
                                        label="Motivation"
                                        name="motivation"
                                        placeholder="Tell us about the company. How do you think NIJobs can help you achieve your goal?"
                                        multiline
                                        error={!!errors.motivation}
                                        inputRef={register}
                                        onChange={resetCompanyApplicationSubmissionError}
                                        helperText={
                                            `${motivation.length}/${CompanyApplicationConstants.motivation.maxLength} ${errors.motivation ?
                                                errors.motivation.message
                                                : ""}`
                                        }
                                        rows={5}
                                        variant="outlined"
                                        FormHelperTextProps={{
                                            style: {
                                                marginLeft: 0,
                                            },
                                        }}
                                    />

                                    {submissionErrors ?
                                        submissionErrors.map((error) => (
                                            <FormHelperText key={error.msg} error={true}>
                                                {error.msg}
                                            </FormHelperText>
                                        ))
                                        :
                                        <FormHelperText error={true}>
                                            {" "}
                                        </FormHelperText>
                                    }

                                </CardContent>
                                <CardActions className={classes.buttonsArea}>
                                    <Button
                                        type="reset"
                                        color="secondary"
                                        disabled={submittingApplication}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            reset();
                                        }}
                                    >
                                Reset
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={submittingApplication}
                                    >
                                Apply
                                    </Button>
                                </CardActions>

                            </Card>
                        </form>
                        <ApplicationInfoDialog open={showWhyModal} toggle={toggleWhyModal} />
                    </React.Fragment>
                }
            </CenteredCard>
        </React.Fragment>
    );
};

CompanyApplicationPage.propTypes = {
    submittingApplication: PropTypes.bool,
    submitCompanyApplication: PropTypes.func,
    submissionErrors: PropTypes.arrayOf(
        PropTypes.shape({
            msg: PropTypes.string.isRequired,
        })),
    setCompanyApplicationSubmissionError: PropTypes.func,
};

export const mapStateToProps = ({ companyApplication }) => ({
    submittingApplication: companyApplication.submittingApplication,
    submissionErrors: companyApplication.errors,
});

export const mapDispatchToProps = (dispatch) => ({
    submitCompanyApplication: (data) => dispatch(submitCompanyApplication(data)),
    setCompanyApplicationSubmissionError: (e) => dispatch(setCompanyApplicationSubmissionError(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyApplicationPage);
