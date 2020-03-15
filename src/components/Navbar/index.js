import React from "react";
import { AppBar,
    Toolbar,
    Button,
    makeStyles,
    Avatar,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    DialogContentText,
} from "@material-ui/core";

import clsx from "clsx";

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
    loginProgressRed: {
        composes: "$loginProgress",
        color: theme.palette.primary.main,
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
    const [showLoginModal, toggleLoginModal] = useToggle(false);
    const [userMenuOpen, setUserMenuOpen] = React.useState(false);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const anchorRef = React.useRef(null);

    const handleLogin = (e, email, password) => {
        e.preventDefault();
        toggleLoginPending();
        return login(email, password).then(() => {
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
                                onClick={toggleLoginModal}
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
                <Dialog open={showLoginModal} aria-labelledby="form-dialog-title" disableScrollLock onClose={() => console.log("asda")}>
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This still need error handling!!!! When login fails, it will stay pending forever since promise never resolves
                        </DialogContentText>
                        <TextField
                            autoFocus
                            id="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={toggleLoginModal}
                            variant="text"
                            color="secondary"
                            disabled={loginPending}
                        >
                            Cancel
                        </Button>
                        <div className={classes.loginBtnWrapper}>
                            <Button
                                className={classes.loginBtn}
                                onClick={(e) => {
                                    handleLogin(e, email, password).then(() =>
                                        toggleLoginModal()
                                    );
                                }}
                                color="primary"
                                variant="contained"
                                disabled={loginPending}
                            >
                            Login
                            </Button>
                            {loginPending &&
                            <CircularProgress
                                size={24}
                                className={clsx(classes.loginProgress, classes.loginProgressRed)}
                            />}
                        </div>
                    </DialogActions>
                </Dialog>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
