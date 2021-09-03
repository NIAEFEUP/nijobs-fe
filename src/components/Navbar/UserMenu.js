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
    Badge,
    Box,
} from "@material-ui/core";
import { logout } from "../../services/auth";

import { useMobile } from "../../utils/media-queries";
import { Link } from "react-router-dom";

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
    labelledDivider: {
        marginTop: theme.spacing(2),
    },
    dividerLabel: {
        padding: theme.spacing(1, 2),
    },
}));

const AdminMenuOptions = ({ isMobile }) => {
    const classes = useStyles({ isMobile });

    return (
        <>
            <Divider className={classes.labelledDivider} component="li" />
            <li>
                <Typography
                    className={classes.dividerLabel}
                    color="textSecondary"
                    display="block"
                    variant="caption"
                    align="right"
                >
                    Admin
                </Typography>
            </li>
            <MenuItem
                button
                disableTouchRipple
                component={Link}
                to="/review/applications"
            >
                Company Applications
            </MenuItem>
        </>
    );
};

AdminMenuOptions.propTypes = {
    isMobile: PropTypes.bool.isRequired,
};

const CompanyMenuOptions = ({ isMobile, sessionData }) => {

    const classes = useStyles({ isMobile });

    if (sessionData.company.hasFinishedRegistration)
        return (
            <MenuItem button component={Link} to="/company/offers/manage" disableTouchRipple>My Offers</MenuItem>
        );
    else {
        return (
            <MenuItem
                button
                className={classes.highlightedMenuItem}
                component={Link}
                to="/company/registration/finish"
                disableTouchRipple
            >
                <Badge
                    variant="dot"
                    color="primary"
                    anchorOrigin={{ horizontal: "left", vertical: "top" }}
                >
                    <Box pl={2}>
                        Finish Registration
                    </Box>
                </Badge>
            </MenuItem>
        );
    }
};

const UserMenuContent = React.forwardRef(({ open, isMobile = false, sessionData, handleLogout }, ref) => {
    const classes = useStyles({ isMobile });
    return (
        <div className={classes.userMenuContent} ref={ref}>
            <Typography
                className={classes.accountName}
                variant="button"
            >
                {sessionData?.email}
            </Typography>
            <Divider className={classes.divider} />
            <MenuList
                className={classes.menuList}
                autoFocusItem={open}
                id="menu-list-grow"
            >
                {sessionData?.company && <CompanyMenuOptions isMobile={isMobile} sessionData={sessionData} />}
                <MenuItem button disableTouchRipple onClick={handleLogout}>Logout</MenuItem>
                {sessionData?.isAdmin && <AdminMenuOptions isMobile={isMobile} />}
            </MenuList>
        </div>
    );
});

UserMenuContent.propTypes = {
    open: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool,
    sessionData: PropTypes.shape({
        email: PropTypes.string,
        isAdmin: PropTypes.bool,
        company: PropTypes.object,
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
        isAdmin: PropTypes.bool,
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
        isAdmin: PropTypes.bool,
    }),
    handleClose: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

const UserMenu = ({ open, anchorRef, sessionData, closeSession, handleClose }) => {

    const handleLogout = (e) => {
        e.preventDefault();
        handleClose(e);
        logout().then(() => closeSession());
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
        isAdmin: PropTypes.bool,
    }),
    closeSession: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default UserMenu;
