import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordRecoverySchema from "./PasswordRecoverySchema";
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
import { submitPasswordRecoverRequest } from "../../../services/auth";

const PasswordRecoveryForm = ({ toggleAuthModal, setLoginPage }) => {
    const classes = useAuthStyles();

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(PasswordRecoverySchema),
        reValidateMode: "onChange",
    });

    const [requestPending, toggleRequestPending] = useToggle(false);

    const [errorCleared, setErrorCleared] = useState(true);

    const [requestError, setRequestError] = useState(null);

    const [success, setSuccess] = useState(false);

    const resetError = () => {
        if (!errorCleared) {
            setRequestError([]);
            setErrorCleared(true);
        }
    };

    const requestRecover = async (data) => {
        toggleRequestPending();
        try {
            await submitPasswordRecoverRequest(data.email);
            toggleRequestPending();
            setSuccess(true);
        } catch (e) {
            toggleRequestPending();
            setRequestError("Unexpected Error. Please try again later.");
        }
    };

    const onSubmit = async (data) => {
        setErrorCleared(false);
        await requestRecover(data);
    };

    return (
        <form
            aria-label="Recover Password"
            onSubmit={handleSubmit(onSubmit)}
        >
            <DialogTitle id="form-dialog-title">Recover Password</DialogTitle>
            <DialogContent>
                {
                    success
                        ? "If you account is registered, you will receive an email containing the following steps"
                        :
                        <>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                onChange={resetError}
                                margin="normal"
                                fullWidth
                                inputProps={{ ...register("email") }}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : <span />}
                            />
                            <FormHelperText error={!!requestError}>
                                {requestError || " "}
                            </FormHelperText>
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
                {
                    !success &&
                    <div className={classes.loginBtnWrapper}>
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
                    </div>
                }

            </DialogActions>
        </form>
    );
};

PasswordRecoveryForm.propTypes = {
    toggleAuthModal: PropTypes.func.isRequired,
    setLoginPage: PropTypes.func.isRequired,
};

export default PasswordRecoveryForm;
