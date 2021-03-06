import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

import useToggle from "../../../hooks/useToggle";

import {
    Card,
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

import CompanyApplicationSchema from "./CompanyApplicationSchema";
import { yupResolver } from "@hookform/resolvers";

import { CompanyApplicationConstants, getHumanError } from "./CompanyApplicationUtils";
import ApplicationInfoDialog from "./ApplicationInfoDialog";

import { submitCompanyApplication } from "../../../services/companyApplicationService";
import { setCompanyApplicationSubmissionError } from "../../../actions/companyApplicationActions";
import { Wrap } from "../../../utils";
import CenteredComponent from "../../HomePage/CenteredComponent";
import useCompanyApplicationStyles from "./companyApplicationStyles";
import { useMobile } from "../../../utils/media-queries";

import ShowPasswordToggle from "../../utils/form/ShowPasswordToggle";

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
        resolver: yupResolver(CompanyApplicationSchema),
        reValidateMode: "onChange",
    });

    const motivation = watch("motivation") || "";

    const classes = useCompanyApplicationStyles(useMobile())();

    const onResetButtonClick = (e) => {
        e.preventDefault();
        resetCompanyApplicationSubmissionError();
        reset();
    };

    const [showPassword, toggleShowPassword] = useToggle(false);

    return (
        <React.Fragment>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={classes.form}
            >
                <Wrap
                    Wrapper={CenteredComponent}
                    on={!useMobile()}
                >
                    <Card className={classes.formCard}>
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
                            <TextField
                                label="Company Name"
                                name="companyName"
                                id="input-companyName"
                                error={!!errors.companyName}
                                inputRef={register}
                                onChange={resetCompanyApplicationSubmissionError}
                                helperText={errors.companyName ? errors.companyName.message : " "}
                                margin="dense"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                id="input-email"
                                error={!!errors.email}
                                inputRef={register}
                                onChange={resetCompanyApplicationSubmissionError}
                                helperText={errors.email ? errors.email.message : " "}
                                margin="dense"
                            />
                            <FormGroup row className={classes.passwordGroupWrapper}>
                                <TextField
                                    label="Password"
                                    name="password"
                                    id="input-password"
                                    type={showPassword ? "text" : "password"}
                                    error={!!errors.password}
                                    inputRef={register}
                                    onChange={resetCompanyApplicationSubmissionError}
                                    helperText={errors.password ? errors.password.message : " "}
                                    margin="dense"
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
                                <TextField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    id="input-confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    error={!!errors.confirmPassword}
                                    inputRef={register}
                                    helperText={errors.confirmPassword ? errors.confirmPassword.message : " "}
                                    margin="dense"
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
                                {
                                    !useMobile() &&
                                        <ShowPasswordToggle
                                            showPassword={showPassword}
                                            toggleShowPassword={toggleShowPassword}
                                            className={classes.showPasswordToggle}
                                        />
                                }
                            </FormGroup>
                            <TextField
                                className={classes.motivation}
                                id="input-motivation"
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
                    </Card>
                </Wrap>
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
