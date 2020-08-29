import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormHelperText,
    makeStyles,
} from "@material-ui/core";

import { login } from "../../services/auth";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";
import LOGIN_SCHEMA from "./LoginSchema";

export const useLoginStyles = makeStyles((theme) => ({
    loginBtnWrapper: {
        display: "grid",
    },
    loginBtn: {
        color: "white",
        gridColumn: 1,
        gridRow: 1,
    },
    loginProgress: {
        color: "white",
        gridColumn: 1,
        gridRow: 1,
        margin: "auto",
    },
    loginProgressRed: {
        composes: "$loginProgress",
        color: theme.palette.primary.main,
    },
}));

const LoginForm = ({ open, toggleLoginModal, loginPending, toggleLoginPending, updateSessionInfo }) => {

    const loginClasses = useLoginStyles();

    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, reset, errors } = useForm({
        mode: "onBlur",
        resolver: yupResolver(LOGIN_SCHEMA),
        reValidateMode: "onChange",
    });

    const [errorCleared, setErrorCleared] = useState(true);

    const [loginError, setLoginError] = React.useState(null);
    const resetError = () => {
        if (!errorCleared) {
            setLoginError([]);
            setErrorCleared(true);
        }
    };

    const handleLogin = async (data) => {
        toggleLoginPending();
        try {
            await login(data.email, data.password);
            updateSessionInfo();
            toggleLoginPending();
            toggleLoginModal();
        } catch (e) {
            toggleLoginPending();
            setLoginError(e.status === 401 ? "Email/Password combination is invalid." : "Unexpected Error. Please try again later.");
        }
    };

    const handleClose = () => {
        resetError();
        reset();
        toggleLoginModal();
    };

    const onSubmit = async (data) => {
        setErrorCleared(false);
        await handleLogin(data);
    };

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title" disableScrollLock onClose={handleClose}>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        onChange={resetError}
                        margin="normal"
                        fullWidth
                        inputRef={register}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : <span/>}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        onChange={resetError}
                        margin="normal"
                        fullWidth
                        inputRef={register}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : <span/>}
                    />
                    <FormHelperText error={!!loginError}>
                        {loginError || " "}
                    </FormHelperText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={toggleLoginModal}
                        variant="text"
                        color="secondary"
                        disabled={loginPending}
                    >
                        Cancel
                    </Button>
                    <div className={loginClasses.loginBtnWrapper}>
                        <Button
                            type="submit"
                            className={loginClasses.loginBtn}
                            color="primary"
                            variant="contained"
                            disabled={loginPending}
                        >
                            Login
                        </Button>
                        {loginPending &&
                            <CircularProgress
                                size={24}
                                className={loginClasses.loginProgressRed}
                            />
                        }
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
};

LoginForm.propTypes = {
    open: PropTypes.bool.isRequired,
    toggleLoginModal: PropTypes.func.isRequired,
    loginPending: PropTypes.bool.isRequired,
    toggleLoginPending: PropTypes.func.isRequired,
    updateSessionInfo: PropTypes.func.isRequired,
};

export default LoginForm;
