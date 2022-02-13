import React from "react";

import {
    LinkedIn,
    Facebook,
    GitHub,
    Instagram,
    Twitter,
    Language,
    Email,
    Gavel,
    Storage,
    ListAlt,
} from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import {
    Grid,
    List,
    ListItem,
    Button,
    Typography,
} from "@material-ui/core";
import { RouterLink } from "../../utils";

const useStyles = makeStyles((theme) => ({
    parentContainer: {
        backgroundColor: theme.palette.dark.main,
        color: theme.palette.dark.contrastText,
        padding: theme.spacing(4),
    },
    colorText: {
        color: theme.palette.tertiary.main,
    },
    backgroundColor: {
        color: theme.palette.dark.main,
    },
    primaryColor: {
        color: theme.palette.primary.main,
    },
}));


const ContactSection = () => {

    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.parentContainer} data-testid="contactSection">
            <Grid container spacing={0}>
                <Grid item xs={12} md={3}>
                    <List>
                        <ListItem>
                            <Typography variant="h5">Contact us</Typography>
                        </ListItem>
                        <ListItem>
                            <Button
                                href="mailto:ni@aefeup.pt"
                                startIcon={<Email htmlColor={theme.palette.primary.main} />}
                                className={classes.primaryColor}
                                title="email"
                            >
                                <Typography variant="subtitle1">ni@aefeup.pt</Typography>
                            </Button>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={0}>
                        <Grid item xs={6} md={3}>
                            <List>
                                <ListItem>
                                    <Typography variant="h5">Social</Typography>
                                </ListItem>
                                <ListItem dense>
                                    <Button
                                        href="https://ni.fe.up.pt"
                                        startIcon={<Language htmlColor={theme.palette.tertiary.main} />}
                                        className={classes.colorText}
                                        title="website"
                                    >
                                        <Typography variant="button">Website</Typography>
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        href="https://facebook.com/NIAEFEUP/"
                                        startIcon={<Facebook htmlColor={theme.palette.tertiary.main} />}
                                        className={classes.colorText}
                                        title="facebook"
                                    >
                                        <Typography variant="button">Facebook</Typography>
                                    </Button>
                                </ListItem>
                                <ListItem dense>
                                    <Button
                                        href="https://github.com/NIAEFEUP"
                                        startIcon={<GitHub htmlColor={theme.palette.tertiary.main} />}
                                        className={classes.colorText}
                                        title="github"
                                    >
                                        <Typography variant="button">Github</Typography>
                                    </Button>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <List>
                                <ListItem>
                                    <Typography variant="h5" className={classes.backgroundColor}>.</Typography>
                                </ListItem>
                                <ListItem dense>
                                    <Button
                                        href="https://www.instagram.com/niaefeup/"
                                        startIcon={<Instagram htmlColor={theme.palette.tertiary.main} />}
                                        className={classes.colorText}
                                        title="instagram"
                                    >
                                        <Typography variant="button">Instagram</Typography>
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        href="https://twitter.com/niaefeup"
                                        startIcon={<Twitter htmlColor={theme.palette.tertiary.main} />}
                                        className={classes.colorText}
                                        title="twitter"
                                    >
                                        <Typography variant="button">Twitter</Typography>
                                    </Button>
                                </ListItem>
                                <ListItem dense>
                                    <Button
                                        href="https://pt.linkedin.com/company/nifeup"
                                        startIcon={<LinkedIn htmlColor={theme.palette.tertiary.main} />}
                                        className={classes.colorText}
                                        title="linkedin"
                                    >
                                        <Typography variant="button">LinkedIn</Typography>
                                    </Button>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                    <List>
                        <ListItem>
                            <Typography variant="h5">Guidelines</Typography>
                        </ListItem>
                        <ListItem>
                            <Button
                                to="rules"
                                startIcon={<ListAlt htmlColor={theme.palette.tertiary.main} />}
                                className={classes.colorText}
                                component={RouterLink}
                                title="rules"
                            >
                                <Typography variant="button">Rules</Typography>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button
                                to="privacy"
                                startIcon={<Storage htmlColor={theme.palette.tertiary.main} />}
                                className={classes.colorText}
                                component={RouterLink}
                                title="privacy"
                            >
                                <Typography variant="button">Privacy Policy</Typography>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button
                                to="terms"
                                startIcon={<Gavel htmlColor={theme.palette.tertiary.main} />}
                                className={classes.colorText}
                                component={RouterLink}
                                title="terms"
                            >
                                <Typography variant="button">Terms and Conditions</Typography>
                            </Button>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </div>
    );
};

export default ContactSection;
