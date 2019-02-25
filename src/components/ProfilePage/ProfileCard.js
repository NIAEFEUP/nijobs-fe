import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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
                        <Grid
                            container
                            className={style.companyName}
                            justify="center"
                        >
                            <Grid
                                item
                            >
                                <Typography
                                    variant="h5"
                                    className={style.companyName}
                                >
                                    NIAEFEUP
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className={`${style.descriptionSeparator} ${style.companyName}`}
                            justify="center"
                        >
                            <Grid
                                item
                                xs={4}
                            >
                                <hr/>
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                className={style.descriptionTitle}
                            >
                                <Typography
                                    variant="h6"
                                    className={style.companyDescription}
                                >
                                    Description
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                            >
                                <hr/>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className={style.companyName}
                            justify="center"
                        >
                            <Grid
                                item
                                xs={6}
                            >
                                <Typography
                                    variant="body1"
                                    className={style.companyDescription}
                                >
                                    O que temos que ter sempre em mente é que a consolidação das estruturas ainda não demonstrou convincentemente que vai participar na mudança das diretrizes de desenvolvimento para o futuro.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default ProfileCard;