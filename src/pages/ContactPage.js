import React, { Component } from "react";

import {
    LinkedIn,
    Facebook,
    GitHub,
    Instagram,
    Twitter,
    Language,
    Email,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Theme from "../AppTheme";

import {
    Grid,
    List,
    ListItem,
    Button,
    Typography,
} from "@material-ui/core";

const styles = {
    parentContainer: {
        backgroundColor: Theme.palette.dark.main,
        color: Theme.palette.dark.contrastText,
        padding: Theme.spacing(4),
    },
    colorText: {
        color: Theme.palette.tertiary.main,
    },
    backgroundColor: {
        color: Theme.palette.dark.main,
    },
    primaryColor: {
        color: Theme.palette.primary.main,
    },
};


class ContactPage extends Component {
    render() {

        const { classes } = this.props;

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
                                    startIcon={<Email htmlColor={Theme.palette.primary.main} />}
                                    className={classes.primaryColor}
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
                                            startIcon={<Language htmlColor={Theme.palette.tertiary.main} />}
                                            className={classes.colorText}
                                        >
                                            <Typography variant="button">Website</Typography>
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            href="https://facebook.com/NIAEFEUP/"
                                            startIcon={<Facebook htmlColor={Theme.palette.tertiary.main}/>}
                                            className={classes.colorText}
                                        >
                                            <Typography variant="button">Facebook</Typography>
                                        </Button>
                                    </ListItem>
                                    <ListItem dense>
                                        <Button
                                            href="https://github.com/NIAEFEUP"
                                            startIcon={<GitHub htmlColor={Theme.palette.tertiary.main} />}
                                            className={classes.colorText}
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
                                            startIcon={<Instagram htmlColor={Theme.palette.tertiary.main} />}
                                            className={classes.colorText}
                                        >
                                            <Typography variant="button">Instagram</Typography>
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Button
                                            href="https://twitter.com/niaefeup"
                                            startIcon={<Twitter htmlColor={Theme.palette.tertiary.main}/>}
                                            className={classes.colorText}
                                        >
                                            <Typography variant="button">Twitter</Typography>
                                        </Button>
                                    </ListItem>
                                    <ListItem dense>
                                        <Button
                                            href="https://pt.linkedin.com/company/nifeup"
                                            startIcon={<LinkedIn htmlColor={Theme.palette.tertiary.main} />}
                                            className={classes.colorText}
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
    }
}

ContactPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactPage);
