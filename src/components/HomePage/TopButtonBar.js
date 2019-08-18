import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";

import { exampleAction } from "../../actions/sleepyActions";

import styles from "./HomePage.module.css";

class TopButtonBar extends Component {
    sleepyClick = () => {
        this.props.exampleAction();
    }

    render() {
        return (
            <Grid
                container
                item
                xs={12}
                spacing={24}
            >
                <Grid
                    item
                    xs={4}
                    className={styles.button}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.sleepyClick}
                    >
                        Sleepy Action
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={4}
                    className={styles.button}
                >
                    <Button
                        variant="text"
                        color="secondary"
                        component={Link}
                        to="/example"
                    >
                        Example Link
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={4}
                    className={styles.button}
                >
                    <Button
                        variant="text"
                        color="secondary"
                        component={Link}
                        to="/other/2"
                    >
                        Example Link with URL Params
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

TopButtonBar.propTypes = {
    exampleAction: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapActionsToProps = {
    exampleAction,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(TopButtonBar));
