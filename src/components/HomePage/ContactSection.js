import React from "react";

import {
    LinkedIn,
    Facebook,
    GitHub,
    Instagram,
    Twitter,
    Language,
    Email,
} from "@material-ui/icons";
<<<<<<< HEAD
import { makeStyles, useTheme } from "@material-ui/core/styles";
=======
import { makeStyles } from "@material-ui/core/styles";
import Theme from "../../AppTheme";
>>>>>>> Added unit tests, changed the contactPage to contactSection and made it a functional component

import {
    Grid,
    List,
    ListItem,
    Button,
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    parentContainer: {
<<<<<<< HEAD
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
=======
        backgroundColor: Theme.palette.dark.main,
        color: Theme.palette.dark.contrastText,
        padding: theme.spacing(4),
    },
    colorText: {
        color: Theme.palette.tertiary.main,
    },
    backgroundColor: {
        color: Theme.palette.dark.main,
    },
    primaryColor: {
        color: Theme.palette.primary.main,
>>>>>>> Added unit tests, changed the contactPage to contactSection and made it a functional component
    },
}));


const ContactSection = () => {

    const classes = useStyles();
<<<<<<< HEAD
    const theme = useTheme();
=======
>>>>>>> Added unit tests, changed the contactPage to contactSection and made it a functional component

    return (
        <div className={classes.parentContainer}>
            <Grid container spacing={0}  >
                <Grid item xs={12} sm={6} md={3}>
                    <List>
                        <ListItem>
                            <Typography variant="h5">Contact us</Typography>
                        </ListItem>
                        <ListItem>
                            <Button
                                href="mailto:ni@aefeup.pt"
<<<<<<< HEAD
                                startIcon={<Email htmlColor={theme.palette.primary.main} />}
=======
                                startIcon={<Email htmlColor={Theme.palette.primary.main} />}
>>>>>>> Added unit tests, changed the contactPage to contactSection and made it a functional component
                                className={classes.primaryColor}
                                title="email"
                            >
                                <Typography variant="subtitle1">ni@aefeup.pt</Typography>
                            </Button>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Grid container spacing={0} >
                        <Grid item xs={6} md={4}>
                            <List>
                                <ListItem>
                                    <Typography variant="h5">Social</Typography>
                                </ListItem>
                                <ListItem dense>
                                    <Button
                                        href="https://ni.fe.up.pt"
<<<<<<< HEAD
                                        startIcon={<Language htmlColor={theme.palette.tertiary.main} />}
=======
                                        startIcon={<Language htmlColor={Theme.palette.tertiary.main} />}
>>>>>>> Added unit tests, changed the contactPage to contactSection and made it a functional component
                                        className={classes.colorText}
                                        title="website"
                                    >
                                        <Typography variant="button">Website</Typography>
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        href="https://facebook.com/NIAEFEUP/"
<<<<<<< HEAD
                                        startIcon={<Facebook htmlColor={theme.palette.tertiary.main}/>}
=======
                                        startIcon={<Facebook htmlColor={Theme.palette.tertiary.main}/>}
>>>>>>> Added unit tests, changed the contactPage to contactSection and made it a functional component
                                        className={classes.colorText}
                                        title="facebook"
                                    >
                                        <Typography variant="button">Facebook</Typography>
                                    </Button>
                                </ListItem>
                                <ListItem dense>
                                    <Button
                                        href="https://github.com/NIAEFEUP"
<<<<<<< HEAD
                                        startIcon={<GitHub htmlColor={theme.palette.tertiary.main} />}
=======
                                        startIcon={<GitHub htmlColor={Theme.palette.tertiary.main} />}
>>>>>>> Added unit tests, changed the contactPage to contactSection and made it a functional component
                                        className={classes.colorText}
                                        title="github"
                                    >
                                        <Typography variant="button">Github</Typography>
                                    </Button>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <List>
                                <ListItem>
                                    <Typography variant="h5" className={classes.backgroundColor}>.</Typography>
                                </ListItem>
                                <ListItem dense>
                                    <Button
                                        href="https://www.instagram.com/niaefeup/"
<<<<<<< HEAD
                                        startIcon={<Instagram htmlColor={theme.palette.tertiary.main} />}
=======
                                        startIcon={<Instagram htmlColor={Theme.palette.tertiary.main} />}
>>>>>>> Added unit tests, changed the contactPage to contactSection and made it a functional component
                                        className={classes.colorText}
                                        title="instagram"
                                    >
                                        <Typography variant="button">Instagram</Typography>
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        href="https://twitter.com/niaefeup"
<<<<<<< HEAD
                                        startIcon={<Twitter htmlColor={theme.palette.tertiary.main}/>}
=======
                                        startIcon={<Twitter htmlColor={Theme.palette.tertiary.main}/>}
>>>>>>> Added unit tests, changed the contactPage to contactSection and made it a functional component
                                        className={classes.colorText}
                                        title="twitter"
                                    >
                                        <Typography variant="button">Twitter</Typography>
                                    </Button>
                                </ListItem>
                                <ListItem dense>
                                    <Button
                                        href="https://pt.linkedin.com/company/nifeup"
<<<<<<< HEAD
                                        startIcon={<LinkedIn htmlColor={theme.palette.tertiary.main} />}
=======
                                        startIcon={<LinkedIn htmlColor={Theme.palette.tertiary.main} />}
>>>>>>> Added unit tests, changed the contactPage to contactSection and made it a functional component
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
            </Grid>
        </div>
    );
};

export default ContactSection;
