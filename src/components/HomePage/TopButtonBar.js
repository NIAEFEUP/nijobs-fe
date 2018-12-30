import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Grid } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';

import { exampleAction } from "../../actions/sleepyActions";

import styles from "./HomePage.module.css";

class TopButtonBar extends Component {
    sleepyClick = () => {
        this.props.exampleAction();
    }

    render() {
        return (
            <React.Fragment>
                <Grid item xs={4} className={styles.button}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.sleepyClick}
                    >
                        Sleepy Action
                    </Button>
                </Grid>
                <Grid item xs={4} className={styles.button}>
                    <Button
                        variant="text"
                        color="secondary"
                        component={Link}
                        to="/example"
                    >
                        Example Link
                    </Button>
                </Grid>
                <Grid item xs={4} className={styles.button}>
                    <Button
                        variant="text"
                        color="secondary"
                        component={Link}
                        to="/other/2"
                    >
                        Example Link with URL Params
                    </Button>
                </Grid>
            </React.Fragment>
        )
    }
};


const mapStateToProps = state => ({});

const mapActionsToProps = {
    exampleAction
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(TopButtonBar));