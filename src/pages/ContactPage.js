import React, { Component } from "react";

import {
    LinkedIn,
    Facebook,
    GitHub,
    Instagram,
    Twitter,
    Language,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
    Grid,
    List,
    ListItem,
    Link,
    Button,
} from "@material-ui/core";

const styles = {
    parentContainer: {
        backgroundColor: "#333",
    },
};

class ContactPage extends Component {
    render() {

        const { classes } = this.props;

        return (
            <div className={classes.parentContainer}>
                <Grid container spacing={3} >
                    <Grid item xs={12} md={3} spacing={3}>
                        <List>
                            <ListItem>
                                <b>Contact us</b>
                            </ListItem>
                            <ListItem>
                                <Link href="mailto:ni@aefeup.pt">ni@aefeup.pt</Link>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3} spacing={3}>
                        <List>
                            <ListItem>
                                <b>Social</b>
                            </ListItem>
                            <ListItem dense>
                                <Button href="https://ni.fe.up.pt" startIcon={<Language/>} >
                                    Website
                                </Button>
                            </ListItem>
                            <ListItem dense>
                                <Button href="https://facebook.com/NIAEFEUP/" startIcon={<Facebook />} >
                                    Facebook
                                </Button>
                            </ListItem>
                            <ListItem dense>
                                <Button href="https://github.com/NIAEFEUP" startIcon={<GitHub />} >
                                    Github
                                </Button>
                            </ListItem>
                            <ListItem dense>
                                <Button href="https://www.instagram.com/niaefeup/" startIcon={<Instagram  />} >
                                    Instagram
                                </Button>
                            </ListItem>
                            <ListItem dense>
                                <Button href="https://twitter.com/niaefeup" startIcon={<Twitter/>} >
                                    Twitter
                                </Button>
                            </ListItem>
                            <ListItem dense>
                                <Button href="https://pt.linkedin.com/company/nifeup" startIcon={<LinkedIn/>} >
                                    LinkedIn
                                </Button>
                            </ListItem>
                        </List>
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
