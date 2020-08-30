import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleLoginModal } from "../../actions/navbarActions";

import {
    AppBar,
    Toolbar,
    Button,
} from "@material-ui/core";

import useSession from "../../hooks/useSession";
import useToggle from "../../hooks/useToggle";
import UserMenu from "./UserMenu";
import LoginForm from "./LoginForm";

import { useMobile } from "../../utils/media-queries";
import { MenuRounded } from "@material-ui/icons";


import useNavbarStyles from "./navbarStyles";

const Navbar = ({ showLoginModal, toggleLoginModal }) => {

    const { data: sessionData, reset: resetSession, isLoggedIn, revalidate: updateSessionInfo } = useSession();
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
    const classes = useNavbarStyles({ isMobile });

    return (
        <AppBar
            className={classes.navbar}
            position="absolute"
            color="transparent"
            elevation={0}
        >
            <Toolbar className={classes.toolbar}>
                <div
                    ref={anchorRef}
                    aria-controls={userMenuOpen ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleUserMenuToggle}
                    className={classes.userAccountArea}
                    data-testid="usermenu-button-wrapper"
                >
                    {isLoggedIn &&
                        <Button
                            className={classes.userMenuButton}
                            disableRipple
                            endIcon={<MenuRounded className={classes.userLogo} color="white"/>}
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
                    resetSession={resetSession}
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
};

const mapStateToProps = ({ navbar }) => ({
    showLoginModal: navbar.showLoginModal,
});

export const mapDispatchToProps = (dispatch) => ({
    toggleLoginModal: () => dispatch(toggleLoginModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
