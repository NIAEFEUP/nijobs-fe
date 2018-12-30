import React, { Component } from 'react'
import TopButtonBar from './TopButtonBar';
import { Grid } from '@material-ui/core';

class ButtonBar extends Component {
    render() {
        return (
            <Grid container spacing={24}>
                <TopButtonBar />
            </Grid>
        );
    }
};

export default ButtonBar;