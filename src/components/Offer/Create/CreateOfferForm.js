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

import CreateOfferSchema from "./CreateOfferSchema";
import { yupResolver } from "@hookform/resolvers";

import { CreateOfferConstants, getHumanError } from "./CreateOfferUtils";

import { submitCreateOffer } from "../../../services/createOfferService";
import { setCreateOfferSubmissionError } from "../../../actions/createOfferActions";
import { Wrap } from "../../../utils";
import CenteredComponent from "../../HomePage/CenteredComponent";
import useCreateOfferStyles from "./CreateOfferStyles";
import { useMobile } from "../../../utils/media-queries";

import ShowPasswordToggle from "../../utils/form/ShowPasswordToggle";

const CreateOfferForm = ({ toggleConfirmationModal, submitCreateOffer, submittingOffer,
    submissionErrors, setCreateOfferSubmissionError }) => {

    const [errorCleared, setErrorCleared] = useState(true);

    const resetCreateOfferSubmissionError = () => {
        if (!errorCleared) {
            setCreateOfferSubmissionError([]);
            setErrorCleared(true);
        }
    };

    const onSubmit = async (data) => {
        setErrorCleared(false);
        if (await submitCreateOffer(data))
            toggleConfirmationModal();
    };

    const { register, handleSubmit, reset, errors, watch } = useForm({
        mode: "onBlur",
        resolver: yupResolver(CreateOfferSchema),
        reValidateMode: "onChange",
    });

    const motivation = watch("motivation") || "";

    const classes = useCreateOfferStyles(useMobile())();

    const onResetButtonClick = (e) => {
        e.preventDefault();
        resetCreateOfferSubmissionError();
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
                            title={!useMobile() && "Create Offer" }
                            subheader={
                                <Link
                                    href=""
                                    to="/"
                                    variant="body2"
                                >
                                You must be authenticated to create a new offer. Click here to go login!
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
                                onChange={resetCreateOfferSubmissionError}
                                helperText={errors.companyName ? errors.companyName.message : " "}
                                margin="dense"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                id="input-email"
                                error={!!errors.email}
                                inputRef={register}
                                onChange={resetCreateOfferSubmissionError}
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
                                    onChange={resetCreateOfferSubmissionError}
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
                                onChange={resetCreateOfferSubmissionError}
                                helperText={
                                    `${motivation.length}/${CreateOfferConstants.motivation.maxLength} ${errors.motivation ?
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
                                disabled={submittingOffer}
                                onClick={onResetButtonClick}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={submittingOffer}
                            >
                                Create offer
                            </Button>
                        </CardActions>
                    </Card>
                </Wrap>
            </form>
        </React.Fragment>
    );
};

CreateOfferForm.propTypes = {
    toggleConfirmationModal: PropTypes.func,
    submittingOffer: PropTypes.bool,
    submitCreateOffer: PropTypes.func,
    submissionErrors: PropTypes.arrayOf(
        PropTypes.shape({
            msg: PropTypes.string.isRequired,
        })),
    setCreateOfferSubmissionError: PropTypes.func,
};

export const mapStateToProps = ({ createOffer }) => ({
    submittingOffer: createOffer.submittingOffer,
    submissionErrors: createOffer.errors,
});

export const mapDispatchToProps = (dispatch) => ({
    submitCreateOffer: (data) => dispatch(submitCreateOffer(data)),
    setCreateOfferSubmissionError: (e) => dispatch(setCreateOfferSubmissionError(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateOfferForm);
