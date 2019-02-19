import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import style from "./Banner.module.css";

const logo = require('./nijobs.png');

class Banner extends Component {
    render() {
        return (
            <Grid 
                container
                justify="center"
                className={style.bannerContainer}
            >
                <Grid 
                    item
                    className={`${style.nijobsCompany} ${style.bannerBackground}`}
                    xs={12}
                >
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                    >
                        <Grid
                            item
                        >
                            <img 
                                src={logo}
                                alt="nijobs logo" 
                                className={style.nijobsLogo}
                            />
                        </Grid>
                        <Grid
                            item
                        >
                            <Typography
                                variant="h3"
                                className={style.nijobsCompanyText}
                            >
                                Company
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Banner;