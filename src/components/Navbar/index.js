import React from "react";
import { AppBar,
    Toolbar,
    Popper,
    // IconButton,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Button,
    makeStyles,
    Typography,
    Avatar,
} from "@material-ui/core";
// import { Person } from "@material-ui/icons";
import useSession from "../../hooks/useSession";
import { login as loginAPI, logout as logoutAPI } from "../../services/auth";

const useStyles = makeStyles((theme) => ({
    loginBtn: {
        color: "white",
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

    const { data, update } = useSession();
    const isLoggedIn = data && Object.keys(data).length !== 0;

    const login = (e) => {
        e.preventDefault();
        loginAPI("angelo@niaefeup.com", "password123").then(() => update());
    };

    const logout = (e) => {
        e.preventDefault();
        logoutAPI().then(() => update());
    };

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        if (isLoggedIn) setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    // return focus to the button when we transitioned from !open -> open
    // const prevOpen = React.useRef(open);
    // React.useEffect(() => {
    //     if (prevOpen.current === true && open === false) {
    //         anchorRef.current.focus();
    //     }

    //     prevOpen.current = open;
    // }, [open]);

    const classes = useStyles();

    return (
        <AppBar position="absolute" color="transparent" elevation={0}>
            <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
                <div
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    {isLoggedIn ?
                        <Avatar className={classes.userLogo}/>
                        :
                        <Button className={classes.loginBtn} onClick={login}>Login</Button>
                    }

                </div>

                <Popper
                    open={open} anchorEl={anchorRef.current}
                    role={undefined} transition disablePortal placement="bottom-end"
                    modifiers={{
                        // inner: { enabled: true },
                        computeStyle: {
                            gpuAcceleration: false,
                        },
                        preventOverflow: {
                            enabled: true,
                            padding: 0,
                        },
                        flip: {
                            enabled: false,
                        },
                        offset: {
                            enabled: true,
                            offset: "0, -10",
                        },
                    }}
                >
                    {({ TransitionProps }) => (
                        <Grow
                            {...TransitionProps}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <Paper className={classes.userMenu}>
                                    <>
                                        <Typography>
                                            {isLoggedIn && data.email}
                                        </Typography>
                                        <MenuList autoFocusItem={open} id="menu-list-grow">
                                            <MenuItem onClick={() => {}}>Profile</MenuItem>
                                            <MenuItem onClick={() => {}}>My account</MenuItem>
                                            <MenuItem
                                                onClick={(e) => {
                                                    handleClose(e);
                                                    logout(e);
                                                }}
                                            >
                                                    Logout
                                            </MenuItem>
                                        </MenuList>
                                    </>
                                </Paper>
                            </ClickAwayListener>
                        </Grow>
                    )}
                </Popper>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
