import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';
import styles from "./HomePage.module.css";

class SleepyActionOutput extends Component {
    render() {
        return (
            <Paper className={styles.paper} elevation={1}>
                <Typography variant="subtitle1">
                    {this.props.sleepyState.done ?
                        "You just called a Redux (Sleepy) Action!"
                        :
                        (this.props.sleepyState.waiting ?
                            "Wait for it..."
                            :
                            "Click Sleepy Action and wait 2 seconds"
                        )
                    }

                </Typography>
            </Paper>
        );
    }
}

SleepyActionOutput.propTypes = {
    sleepyState: PropTypes.object
};

const mapStateToProps = state => ({
    sleepyState: state.sleepy
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(SleepyActionOutput);