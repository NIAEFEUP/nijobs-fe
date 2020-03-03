import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import useForm from "../../../hooks/useForm";
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
} from "@material-ui/core";

import CompanyApplicationSchema from "./CompanyApplicationSchema";
import { CompanyApplicationConstants } from "./CompanyApplicationUtils";
import ApplicationInfoDialog from "./ApplicationInfoDialog";

import { submitCompanyApplication } from "../../../services/companyApplicationService";
import { setCompanyApplicationSubmissionError } from "../../../actions/companyApplicationActions";
import { Wrap } from "../../../utils";
import CenteredComponent from "../../HomePage/CenteredComponent";
import useCompanyApplicationStyles from "./companyApplicationStyles";


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

    const classes = useCompanyApplicationStyles(useMobile())();

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
                <Wrap
                    Wrapper={CenteredComponent}
                    on={!useMobile()}
                >
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
                        <CardContent className={classes.formContent} >
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
