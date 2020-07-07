import React from "react";

import { connect } from "react-redux";
import { toggleLoginModal } from "../../actions/navbarActions";

import { AppBar,
    Toolbar,
    Button,
    makeStyles,
    Avatar,
    Typography,
} from "@material-ui/core";

import useSession from "../../hooks/useSession";
import useToggle from "../../hooks/useToggle";
import UserMenu from "./UserMenu";
import LoginForm from "./LoginForm";

const useStyles = makeStyles((theme) => ({
    navbar: {
        paddingTop: theme.spacing(3),
    },
    toolbar: {
        display: "flex",
        justifyContent: "flex-end",
    },
    userAccountArea: {
        marginRight: theme.spacing(3),
    },
    userLogo: {
        backgroundColor: theme.palette.primary.main,
        zIndex: 1,
        cursor: "pointer",
        padding: theme.spacing(1),
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    userMenu: {
        width: 300,
        padding: theme.spacing(2),
    },
    userMenuButton: {
        color: "white",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
}));

const Navbar = ({ showLoginModal, toggleLoginModal }) => {

    const { data: sessionData, reset: resetSession, isLoggedIn, revalidate: updateSessionInfo } = useSession();
    const [loginPending, toggleLoginPending] = useToggle(false);

    const [userMenuOpen, setUserMenuOpen] = React.useState(false);

    const anchorRef = React.useRef(null);

    const handleUserMenuToggle = () => {
        if (isLoggedIn) setUserMenuOpen((prevOpen) => !prevOpen);
    };

    const handleUserMenuClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;

        setUserMenuOpen(false);
    };

    const classes = useStyles();
    // const loginClasses = useLoginStyles();

    return (
        <AppBar className={classes.navbar} position="absolute" color="transparent" elevation={0}>
            <Toolbar className={classes.toolbar}>
                <div
                    ref={anchorRef}
                    aria-controls={userMenuOpen ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleUserMenuToggle}
                    className={classes.userAccountArea}
                >
                    {isLoggedIn &&
                        <Button
                            className={classes.userMenuButton}
                            disableRipple
                        >
                            {!userMenuOpen &&
                                <Typography variant="button">
                                Account
                                </Typography>
                            }
                            <Avatar
                                className={classes.userLogo}
                            />
                        </Button>
                    }

                </div>
                <UserMenu
                    open={userMenuOpen}
                    anchorRef={anchorRef}
                    handleClose={handleUserMenuClose}
                    sessionData={sessionData}
                    resetSession={resetSession}
                    className={classes.userMenu}
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

const mapStateToProps = ({ navbar }) => ({
    showLoginModal: navbar.showLoginModal,
});

export const mapDispatchToProps = (dispatch) => ({
    toggleLoginModal: () => dispatch(toggleLoginModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
