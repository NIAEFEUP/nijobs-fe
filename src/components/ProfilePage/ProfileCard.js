import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
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
                    <Card 
                        raised="true"
                        className={style.profileCard}
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
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default ProfileCard;