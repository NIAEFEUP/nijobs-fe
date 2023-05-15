import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleAuthModal } from "../../actions/navbarActions";

import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Badge,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import useSession from "../../hooks/useSession";
import UserMenu from "./UserMenu";

import { useMobile } from "../../utils/media-queries";
import { MenuRounded, Home, ExitToApp } from "@material-ui/icons";


import useNavbarStyles from "./navbarStyles";
import { Wrap } from "../../utils";
import AuthModal from "./Auth/AuthModal";
import { addSnackbar } from "../../actions/notificationActions";

const Navbar = ({
    showAuthModal, toggleAuthModal, showHomePageLink = true, desktopLayout, title, position, addSnackbar }) => {

    const { data,
        isValidating,
        error,
        reset: resetSession,
        isLoggedIn,
        revalidate: updateSessionInfo,
    } = useSession({ revalidateOnMount: true });

    const sessionData = (!isValidating && !error && isLoggedIn) ? data : null;

    const [userMenuOpen, setUserMenuOpen] = React.useState(false);

    const anchorRef = React.useRef(null);

    const handleUserMenuToggle = () => {
        if (isLoggedIn) setUserMenuOpen((prevOpen) => !prevOpen);
    };

    const handleUserMenuClose = (event) => {
        if (!event) {
            setUserMenuOpen(false);
            return;
        }
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;

        setUserMenuOpen(false);
    };
    const isMobile = useMobile();
    const classes = useNavbarStyles({ isMobile, desktopLayout });

    return (
        <AppBar
            className={classes.navbar}
            position={position || "absolute"}
            color="transparent"
            elevation={0}
            data-testid="navbar"
        >
            <Toolbar className={classes.toolbar}>
                <div>
                    {showHomePageLink &&
                        <Link to="/" className={classes.linkStyle}>
                            <Home className={classes.homeIcon} />
                            {desktopLayout && "HOMEPAGE"}
                        </Link>
                    }
                </div>
                {title &&
                    <Typography variant="h6" component="h1">
                        {title}
                    </Typography>
                }
                <div
                    ref={anchorRef}
                    aria-controls={userMenuOpen ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleUserMenuToggle}
                    className={classes.userAccountArea}
                    data-testid="usermenu-button-wrapper"
                >
                    {!isValidating && !error && isLoggedIn &&
                        <Button
                            className={classes.userMenuButton}
                            disableRipple
                            endIcon={
                                <Wrap
                                    on={data?.company && !data?.company?.hasFinishedRegistration}
                                    Wrapper={({ children }) =>
                                        <Badge variant="dot" color="secondary" overlap="circular" data-testid="finish-registration-badge">
                                            {children}
                                        </Badge>}
                                >

                                    <MenuRounded className={classes.userLogo} />
                                </Wrap>
                            }
                        >
                            {!userMenuOpen && !isMobile && "Account"}

                        </Button>
                    }
                </div>
                <UserMenu
                    open={userMenuOpen}
                    anchorRef={anchorRef}
                    handleClose={handleUserMenuClose}
                    sessionData={sessionData}
                    closeSession={() => {
                        resetSession().then(() => updateSessionInfo());
                    }}
                />
                <AuthModal
                    open={showAuthModal}
                    updateSessionInfo={updateSessionInfo}
                    toggleAuthModal={toggleAuthModal}
                    addSnackbar={addSnackbar}
                />
                <div>
                    {showHomePageLink && !isLoggedIn &&
                        <Button
                            className={classes.linkStyle}
                            variant="text"
                            color="primary"
                            onClick={toggleAuthModal}
                        >
                            {!desktopLayout && <ExitToApp />}
                            {desktopLayout && "SIGN IN"}
                        </Button>
                    }
                </div>
            </Toolbar>
        </AppBar>
    );
};

Navbar.propTypes = {
    showAuthModal: PropTypes.bool.isRequired,
    toggleAuthModal: PropTypes.func.isRequired,
    showHomePageLink: PropTypes.bool,
    desktopLayout: PropTypes.bool,
    title: PropTypes.string,
    position: PropTypes.oneOf(["absolute", "fixed", "relative", "static", "sticky"]),
    addSnackbar: PropTypes.func.isRequired,
};

const mapStateToProps = ({ navbar }) => ({
    showAuthModal: navbar.showAuthModal,
});

export const mapDispatchToProps = (dispatch) => ({
    toggleAuthModal: () => dispatch(toggleAuthModal()),
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
