import React, { useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    CardHeader,
    CardContent,
    CardActions,
    Button,
    TextField,
} from "@material-ui/core";

import { useMobile } from "../../utils/media-queries";

import usePasswordRecoveryStyles from "./passwordRecoveryStyles";
import { Controller } from "react-hook-form";
import { submitPasswordRequest } from "../../services/accountService";
import { PasswordRecoveryRequestContext } from "../../pages/PasswordRecoveryRequestPage";

const PasswordRequestForm = ({ submitPasswordRequest, submittingRequest }) => {
    const {
        errors,
        reset,
        handleSubmit,
        control,
        toggleConfirmationModal,
    } = useContext(PasswordRecoveryRequestContext);

    const onSubmit = useCallback(async (data) => {
        console.log("data", data);
        if (await submitPasswordRequest(data.email))
            toggleConfirmationModal();
    }, [submitPasswordRequest, toggleConfirmationModal]);

    const onResetButtonClick = useCallback((e) => {
        e.preventDefault();
        reset();
    }, [reset]);


    const isMobile = useMobile();

    const classes = usePasswordRecoveryStyles(isMobile)();

    return (
        <React.Fragment>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={classes.form}
                aria-label="Password Request Form"
            >
                <div className={classes.formCard}>
                    <CardHeader
                        title={!isMobile && "Password Recovery" }
                    />
                    <CardContent className={classes.formContent}>
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
                                    }}
                                    helperText={errors.email ? errors.email.message : " "}
                                    margin="dense"
                                    fullWidth
                                />)}
                            control={control}
                        />
                    </CardContent>
                    <CardActions className={classes.buttonsArea}>
                        <Button
                            type="reset"
                            color="secondary"
                            disabled={submittingRequest}
                            onClick={onResetButtonClick}
                        >
                                Reset
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={submittingRequest}
                        >
                                Recover
                        </Button>
                    </CardActions>
                </div>
            </form>
        </React.Fragment>
    );
};

PasswordRequestForm.propTypes = {
    submittingRequest: PropTypes.bool,
    submitPasswordRequest: PropTypes.func,
};

export const mapStateToProps = ({ passwordRecovery }) => ({
    submittingRequest: passwordRecovery.sendingRequest,
});

export const mapDispatchToProps = (dispatch) => ({
    submitPasswordRequest: (data) => dispatch(submitPasswordRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRequestForm);
