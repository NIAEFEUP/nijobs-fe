import React, { useState } from "react";

import {
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormHelperText,
    DialogContentText,
    makeStyles,
} from "@material-ui/core";

import { login } from "../../services/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const ASD_SCH = yup.object().shape({
    email: yup.string()
        .required("required, but change me")
        .email("email, but change me"),
    password: yup.string()
        .required("required, but change me")
        .min(8),
});

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

    const { register, handleSubmit, reset, errors } = useForm({
        mode: "onBlur",
        validationSchema: ASD_SCH,
        reValidateMode: "onChange",
    });

    const [errorCleared, setErrorCleared] = useState(true);


    // const [email, setEmail] = React.useState("");
    // const [password, setPassword] = React.useState("");
    const [loginError, setLoginError] = React.useState(null);
    const resetError = () => {
        if (!errorCleared) {
            setLoginError([]);
            setErrorCleared(true);
        }
    };

    const handleLogin = (data) => {
        toggleLoginPending();
        login(data.email, data.password)
            .then(() => {
                updateSessionInfo();
                toggleLoginPending();
                toggleLoginModal();
            })
            .catch((e) => {
                toggleLoginPending();
                setLoginError(e.status === 401 ? "Email/Password combination is invalid." : "Unexpected Error. Please try again later.");
            });
    };

    const handleClose = () => {
        console.log("SHOULD RESET FORM HERE, INCLUDING ERRORS!!");
        resetError();
        reset();
        toggleLoginModal();
    };

    const onSubmit = (data) => {
        setErrorCleared(false);
        handleLogin(data);
    };

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title" disableScrollLock onClose={handleClose}>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Need to use redux-form-hook here in order to handle validation, reset and error handling more easily
                    </DialogContentText>

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
                            // onClick={(e) => {
                            //     handleLogin(e, email, password);
                            // }}
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
                        />}
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default LoginForm;
