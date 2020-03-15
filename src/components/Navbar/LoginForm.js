import React from "react";

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
} from "@material-ui/core";

import { login } from "../../services/auth";
import { useLoginStyles } from "./index";


const LoginForm = ({ open, toggleLoginModal, loginPending, toggleLoginPending, updateSessionInfo }) => {

    const loginClasses = useLoginStyles();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginError, setLoginError] = React.useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        toggleLoginPending();
        login(email, password)
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
        toggleLoginModal();
    };

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title" disableScrollLock onClose={handleClose}>
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Need to use redux-form-hook here in order to handle validation, reset and error handling more easily
                </DialogContentText>
                <TextField
                    autoFocus
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    fullWidth
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
                        className={loginClasses.loginBtn}
                        onClick={(e) => {
                            handleLogin(e, email, password);
                        }}
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
        </Dialog>
    );
};

export default LoginForm;
