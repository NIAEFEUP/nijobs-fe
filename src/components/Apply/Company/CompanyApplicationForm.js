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

const CompanyApplicationForm = ({ submitCompanyApplication, submittingApplication,
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
        toggleConfirmationModal,
    } = useContext(CompanyApplicationPageControllerContext);

    const resetCompanyApplicationSubmissionError = useCallback(() => {
        if (!errorCleared) {
            setCompanyApplicationSubmissionError([]);
            setErrorCleared(true);
        }
    }, [errorCleared, setCompanyApplicationSubmissionError, setErrorCleared]);

    const onSubmit = useCallback(async (data) => {
        setErrorCleared(false);
        if (await submitCompanyApplication(data))
            toggleConfirmationModal();
    }, [setErrorCleared, submitCompanyApplication, toggleConfirmationModal]);

    const onResetButtonClick = useCallback((e) => {
        e.preventDefault();
        resetCompanyApplicationSubmissionError();
        reset();
    }, [reset, resetCompanyApplicationSubmissionError]);


    const classes = useCompanyApplicationStyles(useMobile())();

    const isMobile = useMobile();

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
                            render={(
                                { field: { onChange, onBlur, ref, name, value } },
                            ) => (
                                <TextField
                                    name={name}
                                    value={value}
                                    label="Company Name"
                                    id="input-companyName"
                                    error={!!errors.companyName}
                                    inputRef={ref}
                                    onBlur={onBlur}
                                    onChange={(...args) => {
                                        onChange(...args);
                                        resetCompanyApplicationSubmissionError(...args);
                                    }}
                                    helperText={errors.companyName ? errors.companyName.message : " "}
                                    margin="dense"
                                    fullWidth
                                />
                            )}
                            control={control}
                        />
                        <Controller
                            name="email"
                            render={(
                                { field: { onChange, onBlur, ref, name, value } },
                            ) => (
                                <TextField
                                    name={name}
                                    value={value}
                                    label="Email"
                                    id="input-email"
                                    error={!!errors.email}
                                    inputRef={ref}
                                    onBlur={onBlur}
                                    onChange={(...args) => {
                                        onChange(...args);
                                        resetCompanyApplicationSubmissionError(...args);
                                    }}
                                    helperText={errors.email ? errors.email.message : " "}
                                    margin="dense"
                                    fullWidth
                                />)}
                            control={control}
                        />
                        <FormGroup row className={classes.passwordGroupWrapper}>
                            <Controller
                                name="password"
                                render={(
                                    { field: { onChange, onBlur, ref, name, value } },
                                ) => (
                                    <TextField
                                        name={name}
                                        value={value}
                                        label="Password"
                                        id="input-password"
                                        type={showPassword ? "text" : "password"}
                                        error={!!errors.password}
                                        inputRef={ref}
                                        onBlur={onBlur}
                                        onChange={(...args) => {
                                            onChange(...args);
                                            resetCompanyApplicationSubmissionError(...args);
                                        }}
                                        helperText={errors.password ? errors.password.message : " "}
                                        margin="dense"
                                        fullWidth={isMobile}
                                        InputProps={{
                                            endAdornment: isMobile &&
                                            <Wrap on={true} Wrapper={InputAdornment}>
                                                <ShowPasswordToggle
                                                    showPassword={showPassword}
                                                    toggleShowPassword={toggleShowPassword}
                                                />
                                            </Wrap>,
                                        }}
                                    />
                                )}
                                control={control}
                            />
                            <Controller
                                name="confirmPassword"
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        label="Confirm Password"
                                        id="input-confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword ? errors.confirmPassword.message : " "}
                                        margin="dense"
                                        fullWidth={isMobile}
                                        InputProps={{
                                            endAdornment: isMobile &&
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
                            render={(
                                { field: { onChange, onBlur, ref, name, value } },
                            ) => (
                                <TextField
                                    name={name}
                                    value={value}
                                    className={classes.motivation}
                                    id="input-motivation"
                                    label="Motivation"
                                    placeholder="Tell us about the company. How do you think NIJobs can help you achieve your goal?"
                                    multiline
                                    error={!!errors.motivation}
                                    inputRef={ref}
                                    onBlur={onBlur}
                                    onChange={(...args) => {
                                        onChange(...args);
                                        resetCompanyApplicationSubmissionError(...args);
                                    }}
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
                            )}
                            control={control}
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
    submittingApplication: PropTypes.bool,
    submitCompanyApplication: PropTypes.func,
    submissionErrors: PropTypes.arrayOf(
        PropTypes.shape({
            msg: PropTypes.string.isRequired,
        })),
    setCompanyApplicationSubmissionError: PropTypes.func,
};

export const mapStateToProps = ({ companyApplication }) => ({
    submittingApplication: companyApplication.sendingApplication,
    submissionErrors: companyApplication.errors,
});

export const mapDispatchToProps = (dispatch) => ({
    submitCompanyApplication: (data) => dispatch(submitCompanyApplication(data)),
    setCompanyApplicationSubmissionError: (e) => dispatch(setCompanyApplicationSubmissionError(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyApplicationForm);
