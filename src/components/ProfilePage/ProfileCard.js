import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import style from "./ProfileCard.module.css";

const niLogo = require('./logo_2018.png');

class ProfileCard extends Component {
    render() {
        return (
            <Grid 
                container
                justify="center"
            >
                <Grid 
                    item
                    xs={10}
                >
                    <Paper 
                        className={style.profileCard}
                        elevation="9"
                    >
                        <Grid 
                            container
                            className={style.logoContainer}
                            justify="center"
                        >
                            <Grid item>
                                <img 
                                    src={niLogo}
                                    alt="" 
                                    className={style.companyLogo}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default ProfileCard;