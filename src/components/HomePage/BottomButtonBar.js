import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Grid } from '@material-ui/core';

import { getRandomDog, resetRandomDog } from "../../actions/dogActions";

import styles from "./HomePage.module.css";

class BottomButtonBar extends Component {
    getRandomDogClick = () => {
        this.props.getRandomDog();
    }

    resetRandomDogClick = () => {
        this.props.resetRandomDog();
    }

    render() {
        return (
            <Grid container item xs={12} spacing={24}>
                <Grid item xs={6} className={styles.button}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.getRandomDogClick}
                    >
                        Get a random dog!
                    </Button>
                </Grid>
                <Grid item xs={6} className={styles.button}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.resetRandomDogClick}
                    >
                        Reset the dog...
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = () => ({});

const mapActionsToProps = {
    getRandomDog, resetRandomDog
};

export default connect(mapStateToProps, mapActionsToProps)(BottomButtonBar);