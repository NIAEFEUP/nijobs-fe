import React, { useState } from "react";
import PropTypes from "prop-types";
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

import { Wrap } from "../../../utils";
import CenteredComponent from "../../HomePage/CenteredComponent";
import useCreateOfferStyles from "./CreateOfferStyles";
import { useMobile } from "../../../utils/media-queries";

import ShowPasswordToggle from "../../utils/form/ShowPasswordToggle";

const CreateOfferForm = ({ userIsACompany, toggleOfferSubmission, submitCreateOffer, submittingOffer,
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
            toggleOfferSubmission();
    };

    const { register, handleSubmit, reset, errors, watch } = useForm({
        mode: "onBlur",
        resolver: yupResolver(CreateOfferSchema),
        reValidateMode: "onChange",
    });

    const offerDescription = watch("offerDescription") || "";

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
                        />
                        {   userIsACompany ?
                            <CardContent>
                                <Link
                                    href=""
                                    to="/"
                                    variant="body2"
                                >
                                    You must be authenticated to create a new offer. Click here to go login!
                                </Link>
                            </CardContent>
                            : null
                        }
                        <CardContent className={classes.formContent}>
                            <TextField
                                label="Offer Title"
                                name="offerTitle"
                                id="input-offerTitle"
                                error={!!errors.offerTitle}
                                inputRef={register}
                                onChange={resetCreateOfferSubmissionError}
                                helperText={errors.offerTitle ? errors.offerTitle.message : " "}
                                margin="dense"
                            />
                            <TextField
                                label="Employment Type"
                                name="employmentType"
                                id="input-employmentType"
                                error={!!errors.employmentType}
                                inputRef={register}
                                onChange={resetCreateOfferSubmissionError}
                                helperText={errors.employmentType ? errors.employmentType.message : " "}
                                margin="dense"
                            />
                            <FormGroup row className={classes.passwordGroupWrapper}>
                                {/* TODO SHOULD BE START AND END DATES HERE */}
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
                                className={classes.offerDescription}
                                id="input-offerDescription"
                                label="Offer Description"
                                name="offerDescription"
                                placeholder="What does the offer consist on? How does the company and the employee benefit from it?"
                                multiline
                                error={!!errors.offerDescription}
                                inputRef={register}
                                onChange={resetCreateOfferSubmissionError}
                                helperText={
                                    `${offerDescription.length}/${CreateOfferConstants.offerDescription.maxLength} ${errors.offerDescription ?
                                        errors.offerDescription.message
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
    userIsACompany: PropTypes.bool,
    toggleOfferSubmission: PropTypes.func,
    submittingOffer: PropTypes.bool,
    submitCreateOffer: PropTypes.func,
    submissionErrors: PropTypes.arrayOf(
        PropTypes.shape({
            msg: PropTypes.string.isRequired,
        })),
    setCreateOfferSubmissionError: PropTypes.func,
};

export default CreateOfferForm;
