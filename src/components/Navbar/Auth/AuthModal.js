/* eslint-disable no-constant-condition */
import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import {
    Dialog,
} from "@material-ui/core";
import LoginForm from "./LoginForm";
import PasswordRecoveryForm from "./PasswordRecoveryForm";
import useAuthPageSwitcher from "../../../hooks/useAuthPageSwitcher";
import PasswordRecoveryFinishForm from "./PasswordRecoveryFinishForm";

const AuthModal = ({ open, toggleAuthModal, updateSessionInfo }) => {
    const [
        loginActive,
        recoveryRequestActive,
        recoveryFinishActive,
        switchLogin,
        switchRecoveryRequest,
        switchRecoveryFinish,
    ] = useAuthPageSwitcher();

    const onClose = useCallback(
        () => {
            toggleAuthModal();
        },
        [toggleAuthModal],
    );

    // Reset to login page on opening
    useEffect(() => {
        if (open) {
            switchLogin();
        }
    }, [open, switchLogin]);


    return (
        <Dialog open={open} fullWidth aria-labelledby="form-dialog-title" onClose={onClose}>
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
            {recoveryFinishActive &&
                <PasswordRecoveryFinishForm
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
