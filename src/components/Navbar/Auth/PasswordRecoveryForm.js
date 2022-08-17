import React, { useState } from "react";
import PropTypes from "prop-types";
import { login } from "../../../services/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordRecoverySchema from "./PasswordRecoverSchema";
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

// eslint-disable-next-line no-unused-vars
const PasswordRecoveryForm = ({ toggleAuthModal, setLoginPage, setRecoveryFinishPage }) => {
    const classes = useAuthStyles();

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(PasswordRecoverySchema),
        reValidateMode: "onChange",
    });

    const [requestPending, togglerequestPending] = useToggle(false);

    const [errorCleared, setErrorCleared] = useState(true);

    const [requestError, setrequestError] = React.useState(null);
    const resetError = () => {
        if (!errorCleared) {
            setrequestError([]);
            setErrorCleared(true);
        }
    };

    const requestRecover = async (data) => {
        togglerequestPending();
        try {
            await login(data.email, data.password);
        } catch (e) {
            togglerequestPending();
            setrequestError("Unexpected Error. Please try again later.");
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
                    <Button
                        type="submit"
                        className={classes.loginBtn}
                        color="primary"
                        variant="contained"
                        disabled={requestPending}
                    >
                            Login
                    </Button>
                    {requestPending &&
                    <CircularProgress
                        size={24}
                        className={classes.loginProgressRed}
                    />
                    }
                </div>
            </DialogActions>
        </form>
    );
};

PasswordRecoveryForm.propTypes = {
    toggleAuthModal: PropTypes.func.isRequired,
    setLoginPage: PropTypes.func.isRequired,
    setRecoveryFinishPage: PropTypes.func.isRequired,
};

export default PasswordRecoveryForm;
