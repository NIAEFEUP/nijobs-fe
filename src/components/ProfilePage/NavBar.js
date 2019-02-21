import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import style from "./Banner.module.css";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class NavBar extends Component {
    state = {
        value: 'contacts',
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        return (
            <Grid
                container
                justify="center"
            >
                <Grid
                    item
                    xs={10}
                >
                    <Paper className={style.navPaper}
                        elevation="9">
                        <BottomNavigation value={value} onChange={this.handleChange} className={style.navBar}>
                            <BottomNavigationAction label="Posts" value="posts" icon={<Icon>view_list</Icon>} />
                            <BottomNavigationAction label="Contacts" value="contacts" icon={<Icon>contacts</Icon>} />
                        </BottomNavigation>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default NavBar;