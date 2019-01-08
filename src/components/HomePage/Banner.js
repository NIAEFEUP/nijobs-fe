import React, { Component } from 'react'
import { Paper, Grid, Typography } from '@material-ui/core';
import styles from "./HomePage.module.css";


class Banner extends Component {
    render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper className={styles.paper} elevation={5}>
                        <Typography variant="h5" component="h3">
                            Welcome to the Home Page
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default Banner;