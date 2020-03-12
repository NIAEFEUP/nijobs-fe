import React from "react";
import { AppBar,
    Toolbar,
    Button,
    makeStyles,
    Avatar,
    CircularProgress,
} from "@material-ui/core";
import useSession from "../../hooks/useSession";
import { login } from "../../services/auth";
import useToggle from "../../hooks/useToggle";
import UserMenu from "./UserMenu";

const useStyles = makeStyles((theme) => ({
    navbar: {
        paddingTop: theme.spacing(3),
    },
    userAccountArea: {
        marginRight: theme.spacing(3),
    },
    loginBtnWrapper: {
        display: "grid",
    },
    loginBtn: {
        color: "white",
        gridColumn: 1,
        gridRow: 1,
    },
    loginProgress: {
        color: "white",
        gridColumn: 1,
        gridRow: 1,
        margin: "auto",
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
}));

const Navbar = () => {

    const { data: sessionData, reset: resetSession, isLoggedIn, revalidate } = useSession();
    const [loginPending, toggleLoginPending] = useToggle(false);
    const [userMenuOpen, setUserMenuOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleLogin = (e) => {
        e.preventDefault();
        toggleLoginPending();
        login("angelo@niaefeup.com", "password123").then(() => {
            revalidate();
            toggleLoginPending();
        });
    };

    const handleToggle = () => {
        if (isLoggedIn) setUserMenuOpen((prevOpen) => !prevOpen);
    };

    const handleUserMenuClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;

        setUserMenuOpen(false);
    };

    const classes = useStyles();

    return (
        <AppBar className={classes.navbar} position="absolute" color="transparent" elevation={0}>
            <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
                <div
                    ref={anchorRef}
                    aria-controls={userMenuOpen ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    className={classes.userAccountArea}
                >
                    {isLoggedIn ?
                        <Avatar
                            className={classes.userLogo}
                            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                        />
                        :
                        <div className={classes.loginBtnWrapper}>
                            <Button
                                className={classes.loginBtn}
                                onClick={handleLogin}
                                disabled={loginPending}
                            >
                                Login
                            </Button>
                            {loginPending && <CircularProgress size={24} className={classes.loginProgress} />}
                        </div>
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

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
