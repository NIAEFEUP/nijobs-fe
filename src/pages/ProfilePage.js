import React, { Component } from 'react';
import Banner from "../components/ProfilePage/Banner";
import ProfileCard from "../components/ProfilePage/ProfileCard";

class ProfilePage extends Component {
    render() {
        return (
            <div>
                <Banner />
                <ProfileCard />
            </div>
        );
    }
}

export default ProfilePage;