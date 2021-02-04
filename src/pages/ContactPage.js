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
        // clipPath: "polygon(0% 30%, 50% 0%, 100% 30%, 100% 100%, 0% 100%)",   // shows the path that follows the following trajectory
        borderTopRadius: 0,
    },
    centeredText: {
        textAlign: "center",
        paddingTop: "2%",
        paddingBottom: "2%",
        color: "white",
    },
    contactFormContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingBottom: "2%",
    },
    boxContainer: {
        display: "flex",
        flex: 1,
        paddingTop: "2rem",
        paddingBottom: "2rem",
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        marginLeft: "5%",
        marginRight: "5%",
        // borderWidth: 2,
        // borderStyle: "solid",
        // borderColor: "white",
    },
    boxContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    media: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    white: {
        color: "white",
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
                                <Button href="https://ni.fe.up.pt" startIcon={<Facebook/>} >
                                    Facebook
                                </Button>
                            </ListItem>
                            <ListItem dense>
                                <Button href="https://ni.fe.up.pt" startIcon={<GitHub/>} >
                                    Github
                                </Button>
                            </ListItem>
                            <ListItem dense>
                                <Button href="https://ni.fe.up.pt" startIcon={<Instagram/>} >
                                    Instagram
                                </Button>
                            </ListItem>
                            <ListItem dense>
                                <Button href="https://ni.fe.up.pt" startIcon={<Twitter/>} >
                                    Twitter
                                </Button>
                            </ListItem>
                            <ListItem dense>
                                <Button href="https://ni.fe.up.pt" startIcon={<LinkedIn/>} >
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
