import React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
} from "@material-ui/core";
import LoginForm from "./LoginForm";

const AuthModal = ({ open, toggleAuthModal, updateSessionInfo }) => (
    <Dialog open={open} aria-labelledby="form-dialog-title" onClose={toggleAuthModal}>
        <LoginForm toggleAuthModal={toggleAuthModal} updateSessionInfo={updateSessionInfo} />
    </Dialog>
);

AuthModal.propTypes = {
    open: PropTypes.bool.isRequired,
    toggleAuthModal: PropTypes.func.isRequired,
    updateSessionInfo: PropTypes.func.isRequired,
};

export default AuthModal;
