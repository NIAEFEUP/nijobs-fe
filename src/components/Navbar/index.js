import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleLoginModal } from "../../actions/navbarActions";

import {
    AppBar,
    Toolbar,
    Button,
    Typography,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import useSession from "../../hooks/useSession";
import useToggle from "../../hooks/useToggle";
import UserMenu from "./UserMenu";
import LoginForm from "./LoginForm";

import { useMobile } from "../../utils/media-queries";
import { MenuRounded, Home } from "@material-ui/icons";


import useNavbarStyles from "./navbarStyles";

const Navbar = ({ showLoginModal, toggleLoginModal, showHomePageLink = true, desktopLayout, title, position }) => {

    const { data, isValidating, error, reset: resetSession, isLoggedIn, revalidate: updateSessionInfo } = useSession();
    const sessionData = (!isValidating && !error && isLoggedIn) ? data : null;
    const [loginPending, toggleLoginPending] = useToggle(false);

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
    const classes = useNavbarStyles({ isMobile, showHomePageLink, desktopLayout });

    return (
        <AppBar
            className={classes.navbar}
            position={position || "absolute"}
            color="transparent"
            elevation={0}
            data-testid="navbar"
        >
            <Toolbar className={classes.toolbar}>
                <div className={ classes.homePageLink }>
                    {showHomePageLink &&
                        <Link to="/" className={classes.linkStyle}>
                            <Home className={classes.homeIcon}  />
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
                            endIcon={<MenuRounded className={classes.userLogo} />}
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
                <LoginForm
                    open={showLoginModal}
                    updateSessionInfo={updateSessionInfo}
                    loginPending={loginPending}
                    toggleLoginModal={toggleLoginModal}
                    toggleLoginPending={toggleLoginPending}
                />
            </Toolbar>
        </AppBar>
    );
};

Navbar.propTypes = {
    showLoginModal: PropTypes.bool.isRequired,
    toggleLoginModal: PropTypes.func.isRequired,
    showHomePageLink: PropTypes.bool,
    desktopLayout: PropTypes.bool,
    title: PropTypes.string,
    position: PropTypes.oneOf(["absolute", "fixed", "relative", "static", "sticky"]),
};

const mapStateToProps = ({ navbar }) => ({
    showLoginModal: navbar.showLoginModal,
});

export const mapDispatchToProps = (dispatch) => ({
    toggleLoginModal: () => dispatch(toggleLoginModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
