import React, { useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    CardHeader,
    Link,
    CardContent,
    CardActions,
    Button,
    TextField,
    FormHelperText,
    InputAdornment,
    FormGroup,
} from "@material-ui/core";

import { CompanyApplicationConstants, getHumanError } from "./CompanyApplicationUtils";
import ApplicationInfoDialog from "./ApplicationInfoDialog";

import { submitCompanyApplication } from "../../../services/companyApplicationService";
import { setCompanyApplicationSubmissionError } from "../../../actions/companyApplicationActions";
import { Wrap } from "../../../utils";
import useCompanyApplicationStyles from "./companyApplicationStyles";
import { useMobile } from "../../../utils/media-queries";

import ShowPasswordToggle from "../../utils/form/ShowPasswordToggle";
import { CompanyApplicationPageControllerContext } from "../../../pages/CompanyApplicationPage";
import { Controller } from "react-hook-form";

const CompanyApplicationForm = ({ toggleConfirmationModal, submitCompanyApplication, submittingApplication,
    submissionErrors, setCompanyApplicationSubmissionError }) => {

    const {
        openWhyModal,
        errors,
        showPassword,
        toggleShowPassword,
        motivation,
        showWhyModal,
        toggleWhyModal,
        errorCleared,
        setErrorCleared,
        reset,
        handleSubmit,
        control,
    } = useContext(CompanyApplicationPageControllerContext);

    const resetCompanyApplicationSubmissionError = () => {
        if (!errorCleared) {
            setCompanyApplicationSubmissionError([]);
            setErrorCleared(true);
        }
    };

    const onSubmit = useCallback(async (data) => {
        setErrorCleared(false);
        if (await submitCompanyApplication(data))
            toggleConfirmationModal();
    }, [setErrorCleared, submitCompanyApplication, toggleConfirmationModal]);

    const onResetButtonClick = (e) => {
        e.preventDefault();
        resetCompanyApplicationSubmissionError();
        reset();
    };

    const classes = useCompanyApplicationStyles(useMobile())();

    return (
        <React.Fragment>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={classes.form}
                aria-label="Company Application Form"
            >
                <div className={classes.formCard}>
                    <CardHeader
                        title={!useMobile() && "Company Application" }
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
                        <Controller
                            name="companyName"
                            as={
                                <TextField
                                    label="Company Name"
                                    id="input-companyName"
                                    error={!!errors.companyName}
                                    onChange={resetCompanyApplicationSubmissionError}
                                    helperText={errors.companyName ? errors.companyName.message : " "}
                                    margin="dense"
                                    fullWidth
                                />
                            }
                            control={control}
                            defaultValue=""
                        />
                        <Controller
                            name="email"
                            as={
                                <TextField
                                    label="Email"
                                    id="input-email"
                                    error={!!errors.email}
                                    onChange={resetCompanyApplicationSubmissionError}
                                    helperText={errors.email ? errors.email.message : " "}
                                    margin="dense"
                                    fullWidth
                                />}
                            control={control}
                            defaultValue=""
                        />
                        <FormGroup row className={classes.passwordGroupWrapper}>
                            <Controller
                                name="password"
                                as={
                                    <TextField
                                        label="Password"
                                        id="input-password"
                                        type={showPassword ? "text" : "password"}
                                        error={!!errors.password}
                                        onChange={resetCompanyApplicationSubmissionError}
                                        helperText={errors.password ? errors.password.message : " "}
                                        margin="dense"
                                        fullWidth={useMobile()}
                                        InputProps={{
                                            endAdornment: useMobile() &&
                                            <Wrap on={true} Wrapper={InputAdornment}>
                                                <ShowPasswordToggle
                                                    showPassword={showPassword}
                                                    toggleShowPassword={toggleShowPassword}
                                                />
                                            </Wrap>,
                                        }}
                                    />
                                }
                                control={control}
                                defaultValue=""
                            />
                            <Controller
                                name="confirmPassword"
                                as={
                                    <TextField
                                        label="Confirm Password"
                                        id="input-confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword ? errors.confirmPassword.message : " "}
                                        margin="dense"
                                        fullWidth={useMobile()}
                                        InputProps={{
                                            endAdornment: useMobile() &&
                                            <Wrap on={true} Wrapper={InputAdornment}>
                                                <ShowPasswordToggle
                                                    showPassword={showPassword}
                                                    toggleShowPassword={toggleShowPassword}
                                                />
                                            </Wrap>,
                                        }}
                                    />}
                                control={control}
                                defaultValue=""
                            />
                            {
                                !useMobile() &&
                                <ShowPasswordToggle
                                    showPassword={showPassword}
                                    toggleShowPassword={toggleShowPassword}
                                    className={classes.showPasswordToggle}
                                />
                            }
                        </FormGroup>
                        <Controller
                            name="motivation"
                            as={
                                <TextField
                                    className={classes.motivation}
                                    id="input-motivation"
                                    label="Motivation"
                                    placeholder="Tell us about the company. How do you think NIJobs can help you achieve your goal?"
                                    multiline
                                    error={!!errors.motivation}
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
                                    fullWidth
                                />
                            }
                            control={control}
                            defaultValue=""
                        />

                        {submissionErrors ?
                            submissionErrors.map((error) => (
                                <FormHelperText key={error.msg} data-testid="submission-error" error={true}>
                                    {getHumanError(error.msg)}
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
                            onClick={onResetButtonClick}
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
                </div>
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
