import React, { useMemo } from "react";
import PropTypes from "prop-types";
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
    SwipeableDrawer,
    Divider,
} from "@material-ui/core";
import { logout } from "../../services/auth";

import { useMobile } from "../../utils/media-queries";

const useStyles = makeStyles((theme) => ({
    userMenuContent: ({ isMobile }) => ({
        width: isMobile ? "100%" : 300,
        padding: theme.spacing(2),
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
    }),
    accountName: ({ isMobile }) => ({
        margin: isMobile ? theme.spacing(1) : theme.spacing(3, 2),
        marginBottom: theme.spacing(1),
        overflowWrap: "anywhere",
    }),
    menuList: {
        "& > *": {
            justifyContent: "flex-end",
        },
    },
    userMenuPaper: {
        borderRadius: "10px 10px 0px 0px",
    },
    divider: {
        margin: theme.spacing(1),
        width: "80%",
    },
}));

const UserMenuContent = ({ open, isMobile = false, sessionData, handleLogout }) => {
    const classes = useStyles({ isMobile });
    return (
        <div className={classes.userMenuContent}>
            <Typography
                className={classes.accountName}
                variant="button"
            >
                {sessionData?.email}
            </Typography>
            <Divider className={classes.divider}/>
            <MenuList
                className={classes.menuList}
                autoFocusItem={open}
                id="menu-list-grow"
            >
                <MenuItem button disableTouchRipple onClick={() => {}}>My Offers</MenuItem>
                <MenuItem button disableTouchRipple onClick={() => {}}>Profile</MenuItem>
                <MenuItem button disableTouchRipple onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
        </div>
    );
};

UserMenuContent.propTypes = {
    open: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool,
    sessionData: PropTypes.shape({
        email: PropTypes.string,
    }),
    handleLogout: PropTypes.func.isRequired,
};

const DesktopUserMenu = ({ open, anchorRef, handleClose, sessionData, handleLogout }) => {

    const theme = useTheme();

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

    return (
        <Popper
            open={open}
            anchorEl={anchorRef.current}
            role="dialog"
            data-testid="menu-popover"
            transition
            disablePortal
            placement="bottom-end"
            modifiers={{ ...PopperModifiers }}
        >
            {({ TransitionProps }) => (
                <Grow
                    {...TransitionProps}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <UserMenuContent
                                open={open}
                                sessionData={sessionData}
                                handleLogout={handleLogout}
                            />
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
};

DesktopUserMenu.propTypes = {
    open: PropTypes.bool.isRequired,
    anchorRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    sessionData: PropTypes.shape({
        email: PropTypes.string,
    }),
    handleLogout: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};

const MobileUserMenu = ({ open, handleClose, sessionData, handleLogout }) => {
    const classes = useStyles({ isMobile: true });
    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onOpen={() => {}}
            onClose={handleClose}
            disableSwipeToOpen
            classes={{ paper: classes.userMenuPaper }}
        >
            <UserMenuContent
                isMobile
                open={open}
                sessionData={sessionData}
                handleLogout={handleLogout}
            />
        </SwipeableDrawer>
    );
};

MobileUserMenu.propTypes = {
    open: PropTypes.bool.isRequired,
    sessionData: PropTypes.shape({
        email: PropTypes.string,
    }),
    handleClose: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

const UserMenu = ({ open, anchorRef, sessionData, resetSession, handleClose }) => {

    const handleLogout = (e) => {
        e.preventDefault();
        handleClose(e);
        logout().then(() => resetSession());
    };

    const isMobile = useMobile();

    return (
        <>
            {isMobile ?
                <MobileUserMenu
                    open={open}
                    sessionData={sessionData}
                    handleClose={handleClose}
                    handleLogout={handleLogout}
                />
                :
                <DesktopUserMenu
                    open={open}
                    anchorRef={anchorRef}
                    sessionData={sessionData}
                    handleClose={handleClose}
                    handleLogout={handleLogout}
                />
            }
        </>

    );
};

UserMenu.propTypes = {
    open: PropTypes.bool.isRequired,
    anchorRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    sessionData: PropTypes.shape({
        email: PropTypes.string,
    }),
    resetSession: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default UserMenu;
