import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordRecoveryFinishSchema from "./PasswordRecoveryFinishSchema";
import useAuthStyles from "./authStyles";
import {
    CircularProgress,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormHelperText,
} from "@material-ui/core";
import useToggle from "../../../hooks/useToggle";
import { submitFinishPasswordRecover, verifyPasswordRecoveryToken } from "../../../services/auth";
import { parseRequestErrors } from "./AuthUtils";

const PasswordRecoveryFinishForm = ({ token, toggleAuthModal, setLoginPage, setRecoveryRequestPage, addSnackbar }) => {
    const classes = useAuthStyles();

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(PasswordRecoveryFinishSchema),
        reValidateMode: "onChange",
    });

    const [requestPending, toggleRequestPending] = useToggle(false);
    const [verifyingToken, setVerifyingToken] = useState(false);
    const [validToken, setValidToken] = useState(false);

    const [errorCleared, setErrorCleared] = useState(true);

    const [requestErrors, setRequestErrors] = React.useState({});

    const resetError = () => {
        if (!errorCleared) {
            setRequestErrors({});
            setErrorCleared(true);
        }
    };

    const finishRecover = async (data) => {
        toggleRequestPending();
        try {
            await submitFinishPasswordRecover(token, data.password);
            toggleRequestPending();
            setLoginPage();
            addSnackbar({
                message: "The password was updated",
                key: "password-updated",
            });
        } catch (err) {
            toggleRequestPending();
            const errors = parseRequestErrors(err);
            setRequestErrors(errors);
        }
    };

    const verifyToken = useCallback(async () => {
        if (!token) {
            return;
        }

        setVerifyingToken(true);

        try {
            await verifyPasswordRecoveryToken(token);
            setVerifyingToken(false);
            setValidToken(true);
        } catch (err) {
            const errors = parseRequestErrors(err);
            setRequestErrors(errors);
            setValidToken(false);
            setVerifyingToken(false);
        }
    }, [token]);

    const onSubmit = async (data) => {
        setErrorCleared(false);
        await finishRecover(data);
    };

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);


    if (verifyingToken) {
        return <></>;
    }

    return (
        <form
            aria-label="Recover Password"
            onSubmit={handleSubmit(onSubmit)}
        >
            <DialogTitle id="form-dialog-title">Recover Password</DialogTitle>
            <DialogContent>
                {
                    validToken ? (
                        <>
                            <TextField
                                id="password"
                                name="password"
                                label="New Password"
                                type="password"
                                onChange={resetError}
                                margin="normal"
                                fullWidth
                                inputProps={{ ...register("password") }}
                                error={!!errors.password || !!requestErrors.password}
                                helperText={errors.password?.message || requestErrors.password?.message || " "}
                            />
                            {
                                requestErrors?.generalErrors &&
                                    requestErrors.generalErrors.map((error, idx) => (
                                        <FormHelperText key={`${error.message}-${idx}`} error>
                                            {error.message}
                                        </FormHelperText>
                                    ))
                            }

                        </>
                    ) :
                        <>
                            {requestErrors?.generalErrors && requestErrors.generalErrors[0].message}
                        </>
                }

            </DialogContent>
            <DialogActions>
                <Button
                    onClick={setLoginPage}
                    variant="text"
                    disabled={requestPending}
                    color="secondary"
                >
                    Login
                </Button>
                <Button
                    onClick={toggleAuthModal}
                    variant="text"
                    color="secondary"
                    disabled={requestPending}
                >
                    Cancel
                </Button>
                <div className={classes.loginBtnWrapper}>
                    {
                        validToken ? (
                            <>
                                <Button
                                    type="submit"
                                    className={classes.loginBtn}
                                    color="primary"
                                    variant="contained"
                                    disabled={requestPending}
                                >
                                    Recover Password
                                </Button>
                                {requestPending &&
                                <CircularProgress
                                    size={24}
                                    className={classes.loginProgressRed}
                                />
                                }

                            </>
                        ) : (
                            <Button
                                onClick={setRecoveryRequestPage}
                                variant="text"
                                disabled={requestPending}
                                color="secondary"
                            >
                                Lost password?
                            </Button>
                        )
                    }

                </div>
            </DialogActions>
        </form>
    );
};

PasswordRecoveryFinishForm.propTypes = {
    toggleAuthModal: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    setLoginPage: PropTypes.func.isRequired,
    setRecoveryRequestPage: PropTypes.func.isRequired,
    addSnackbar: PropTypes.func.isRequired,
};

export default PasswordRecoveryFinishForm;
