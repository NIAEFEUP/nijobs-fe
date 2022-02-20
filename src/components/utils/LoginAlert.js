import { Box, Button, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { connect } from "react-redux";
import { toggleLoginModal } from "../../actions/navbarActions";
import { RouterLink } from "../../utils";
import { PropTypes } from "prop-types";

const useStyles = makeStyles((theme) => ({
    mainBox: {
        width: "100%",
        marginBottom: theme.spacing(6),
    },
    loginAlert: {
        width: "100%",
        justifyContent: "center",
    },
    actionButtons: {
        marginLeft: "initial",
    },
}));

const LoginAlert = ({ isLoggedIn, companyUnfinishedRegistration, toggleLoginModal }) => {
    const style = useStyles();

    return (
        <>
            {!isLoggedIn &&
            <Box className={style.mainBox}>
                <Alert
                    severity="error"
                    classes={{
                        root: style.loginAlert,
                        action: style.actionButtons,
                    }}
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
            <Box className={style.mainBox}>
                <Alert
                    severity="error"
                    classes={{
                        root: style.loginAlert,
                        action: style.actionButtons,
                    }}
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
};

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
