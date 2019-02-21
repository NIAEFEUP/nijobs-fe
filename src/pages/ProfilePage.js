import React, { Component } from 'react';
import Banner from "../components/ProfilePage/Banner";
import ProfileCard from "../components/ProfilePage/ProfileCard";
import NavBar from "../components/ProfilePage/NavBar";

class ProfilePage extends Component {
    render() {
        return (
            <div>
                <Banner />
                <ProfileCard />
                <NavBar />
            </div>
        );
    }
}

export default ProfilePage;