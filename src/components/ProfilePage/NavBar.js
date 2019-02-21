import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';
import style from "./NavBar.module.css";


class NavBar extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        return (
            <div className={style.navBar}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        centered
                    >
                        <Tab label="Posts" icon={<Icon>view_list</Icon>} />
                        <Tab label="Contacts" icon={<Icon>contacts</Icon>} />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

export default NavBar;