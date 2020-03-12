import React, { useMemo } from "react";
import {
    Popper,
    Grow,
    ClickAwayListener,
    Paper,
    Typography,
    MenuList,
    MenuItem,
    useTheme,
    makeStyles,
} from "@material-ui/core";
import { logout } from "../../services/auth";

const useStyles = makeStyles((theme) => ({
    userMenuContent: {
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
    },
    accountName: {
        margin: theme.spacing(3, 2),
        marginBottom: theme.spacing(1),
    },
    menuList: {
        "& > *": {
            justifyContent: "flex-end",
        },
    },
}));

const UserMenu = ({ open, anchorRef, sessionData, resetSession, handleClose, className: PaperClassname }) => {

    const theme = useTheme();
    const classes = useStyles();

    const PopperModifiers = useMemo(() => ({
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
            offset: `${theme.spacing(3)}, ${theme.spacing(-3)}`,
        },
    }), [theme]);

    const handleLogout = (e) => {
        e.preventDefault();
        handleClose(e);
        logout().then(() => resetSession());
    };

    return (
        <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            placement="bottom-end"
            modifiers={{ ...PopperModifiers }}
        >
            {({ TransitionProps }) => (
                <Grow
                    {...TransitionProps}
                >
                    <ClickAwayListener onClickAway={handleClose}>
                        <Paper className={PaperClassname}>
                            <div className={classes.userMenuContent}>
                                <Typography
                                    className={classes.accountName}
                                    variant="button"
                                >
                                    {sessionData && `I need overflow handling ${sessionData.email}`}
                                </Typography>
                                <MenuList
                                    className={classes.menuList}
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                >
                                    <MenuItem onClick={() => {}}>My Offers</MenuItem>
                                    <MenuItem onClick={() => {}}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            </div>
                        </Paper>
                    </ClickAwayListener>
                </Grow>
            )}
        </Popper>
    );
};

export default UserMenu;
