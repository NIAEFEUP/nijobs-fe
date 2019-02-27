import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import style from "./TabController.module.css";
import PropTypes from 'prop-types';

export const TABS = Object.freeze({
    CONTACTS: "contacts",
    POSTS: "posts"
});

class TabController extends Component {
    static propTypes = {
        modifyView: PropTypes.func.isRequired,
        value: PropTypes.oneOf(Object.values(TABS)).isRequired
    }

    handleChange = (event, value) => {
        this.props.modifyView(value);
    };

    render() {
        return (
            <React.Fragment>
                <BottomNavigation
                    value={this.props.value}
                    onChange={this.handleChange}
                    className={style.tabController}
                    showLabels
                >
                    <BottomNavigationAction 
                        label="Posts"
                        value={TABS.POSTS}
                        icon={
                            <Icon>
                                view_list
                            </Icon>
                        }
                    />
                    <BottomNavigationAction 
                        label="Contacts"
                        value={TABS.CONTACTS}
                        icon={
                            <Icon>
                                contacts
                            </Icon>
                        }
                    />
                </BottomNavigation>
            </React.Fragment>
        );
    }
}

export default TabController;