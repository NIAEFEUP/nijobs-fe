/* eslint-disable no-constant-condition */
import React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
} from "@material-ui/core";
import LoginForm from "./LoginForm";
import PasswordRecoveryForm from "./PasswordRecoveryForm";
import useAuthStyles from "./authStyles";
import useAuthPageSwitcher from "../../../hooks/useAuthPageSwitcher";

const AuthModal = ({ open, toggleAuthModal, updateSessionInfo }) => {
    const classes = useAuthStyles();

    const [
        loginActive,
        recoveryRequestActive,
        // eslint-disable-next-line no-unused-vars
        recoveryFinishActive,
        switchLogin,
        switchRecoveryRequest,
        switchRecoveryFinish,
    ] = useAuthPageSwitcher();

    return (
        <Dialog open={open} fullWidth aria-labelledby="form-dialog-title" onClose={toggleAuthModal}>
            {loginActive &&
                <LoginForm
                    toggleAuthModal={toggleAuthModal}
                    updateSessionInfo={updateSessionInfo}
                    setRecoveryRequestPage={switchRecoveryRequest}
                />}
            {recoveryRequestActive &&
                <PasswordRecoveryForm
                    toggleAuthModal={toggleAuthModal}
                    setLoginPage={switchLogin}
                    setRecoveryFinishPage={switchRecoveryFinish}
                />}
        </Dialog>
    );
};

AuthModal.propTypes = {
    open: PropTypes.bool.isRequired,
    toggleAuthModal: PropTypes.func.isRequired,
    updateSessionInfo: PropTypes.func.isRequired,
};

export default AuthModal;
