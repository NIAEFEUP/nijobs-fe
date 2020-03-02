import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import useForm from "../../../hooks/useForm";
import useToggle from "../../../hooks/useToggle";

import {
    TextField,
    makeStyles,
    FormHelperText,
} from "@material-ui/core";

import CompanyApplicationSchema from "./CompanyApplicationSchema";
import { CompanyApplicationConstants } from "./CompanyApplicationUtils";
import ApplicationInfoDialog from "./ApplicationInfoDialog";

import { submitCompanyApplication } from "../../../services/companyApplicationService";
import { setCompanyApplicationSubmissionError } from "../../../actions/companyApplicationActions";
import CompanyApplicationFormDesktopLayout from "./CompanyApplicationFormDesktopLayout";
import CompanyApplicationFormMobileLayout from "./CompanyApplicationFormMobileLayout";

const useStyles = (isMobile) => makeStyles((theme) => ({
    form: {
        width: isMobile ? "100%" : "60%",
    },
    motivation: {
        marginTop: theme.spacing(5),
    },
}));

const AbstractLayout = ({
    el: Layout,
    openWhyModal,
    submittingApplication,
    onResetButtonClick,
    errors,
    register,
    resetCompanyApplicationSubmissionError,
    classes,
    motivation,
    submissionErrors,
}) => (
    <Layout
        openWhyModal={openWhyModal}
        submittingApplication={submittingApplication}
        onResetButtonClick={onResetButtonClick}
    >

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
    </Layout>
);

const CompanyApplicationForm = ({ toggleConfirmationModal, submitCompanyApplication, submittingApplication,
    submissionErrors, setCompanyApplicationSubmissionError }) => {

    const [errorCleared, setErrorCleared] = useState(true);

    const [showWhyModal, toggleWhyModal] = useToggle(false);

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

    const onSubmit = async (data) => {
        setErrorCleared(false);
        if (await submitCompanyApplication(data))
            toggleConfirmationModal();
    };

    const { register, handleSubmit, reset, errors, watch } = useForm({
        mode: "onBlur",
        validationSchema: CompanyApplicationSchema,
        reValidateMode: "onChange",
    });

    const motivation = watch("motivation") || "";

    // REPLACE THIS ONCE MEDIA QUERIES ARE MERGED
    const useMobile = () => true;

    const classes = useStyles(useMobile())();

    const onResetButtonClick = (e) => {
        e.preventDefault();
        resetCompanyApplicationSubmissionError();
        reset();
    };


    return (
        <React.Fragment>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={classes.form}
            >
                {useMobile() ?
                    <AbstractLayout
                        el={CompanyApplicationFormMobileLayout}
                        openWhyModal={openWhyModal}
                        submittingApplication={submittingApplication}
                        onResetButtonClick={onResetButtonClick}
                        errors={errors}
                        register={register}
                        resetCompanyApplicationSubmissionError={resetCompanyApplicationSubmissionError}
                        classes={classes}
                        motivation={motivation}
                        submissionErrors={submissionErrors}
                    />
                    :
                    <AbstractLayout
                        el={CompanyApplicationFormDesktopLayout}
                        openWhyModal={openWhyModal}
                        submittingApplication={submittingApplication}
                        onResetButtonClick={onResetButtonClick}
                        errors={errors}
                        register={register}
                        resetCompanyApplicationSubmissionError={resetCompanyApplicationSubmissionError}
                        classes={classes}
                        motivation={motivation}
                        submissionErrors={submissionErrors}
                    />
                }

            </form>
            <ApplicationInfoDialog open={showWhyModal} toggle={toggleWhyModal} />
        </React.Fragment>
    );
};

CompanyApplicationForm.propTypes = {
    toggleConfirmationModal: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyApplicationForm);
