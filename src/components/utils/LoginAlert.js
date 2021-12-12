import { Box, Button, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { connect } from "react-redux";
import { toggleLoginModal } from "../../actions/navbarActions";
import { RouterLink } from "../../utils";
import { PropTypes } from "prop-types";

const style = makeStyles({
    loginAlert: {
        left: 0,
        justifyContent: "flex-start",
    },
});

const LoginAlert = ({ isLoggedIn, companyUnfinishedRegistration, toggleLoginModal }) => (
    <>
        {!isLoggedIn &&
        <Box alignContent="flex-start">
            <Alert
                className={style.loginAlert}
                severity="error"
                action={
                    <>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={toggleLoginModal}
                        >
                    Login
                        </Button>
                        <Button
                            color="inherit"
                            size="small"
                            component={RouterLink}
                            to="/apply/company"
                        >
                    Join us
                        </Button>
                    </>
                }
            >
        The user must be logged in to create an offer
            </Alert>
        </Box>
        }
        {companyUnfinishedRegistration &&
        <Box alignContent="flex-start">
            <Alert
                severity="error"
                action={
                    <Button
                        color="inherit"
                        size="small"
                        component={RouterLink}
                        to="/company/registration/finish"
                    >
                Finish Registration
                    </Button>
                }
            >
            The company must finish its registration
            </Alert>
        </Box>
        }
    </>
);

LoginAlert.displayName = "LoginAlert";
LoginAlert.propTypes = {
    isLoggedIn: PropTypes.bool,
    companyUnfinishedRegistration: PropTypes.bool,
    toggleLoginModal: PropTypes.func,

};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    toggleLoginModal: () => dispatch(toggleLoginModal()),
});

const ConnectedLoginAlert = connect(mapStateToProps, mapDispatchToProps)(LoginAlert);

export default ConnectedLoginAlert;
