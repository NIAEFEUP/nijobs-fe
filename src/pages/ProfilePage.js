import React, { Component } from 'react';
import Banner from "../components/ProfilePage/Banner";
import ProfileCard from "../components/ProfilePage/ProfileCard";
import TabController from "../components/ProfilePage/TabController";
import PostsContainer from "../components/ProfilePage/PostsContainer";
import ContactsContainer from "../components/ProfilePage/ContactsContainer";
import { TABS } from "../components/ProfilePage/TabController";

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: TABS.POSTS
        };
    }

    modifyView = view => {
        this.setState({
            currentTab: view
        });
    }

    render() {
        return (
            <React.Fragment>
                <Banner />
                <ProfileCard />
                {this.state.currentTab === TABS.POSTS &&
                    <PostsContainer />
                }
                {this.state.currentTab === TABS.CONTACTS &&
                    <ContactsContainer />
                }
                <TabController
                    modifyView={this.modifyView} 
                    value={this.state.currentTab} 
                />
            </React.Fragment>
        );
    }
}

export default ProfilePage;