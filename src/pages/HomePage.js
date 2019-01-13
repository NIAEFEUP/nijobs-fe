import React, { Component } from 'react';

import Banner from '../components/HomePage/Banner';
import ButtonBar from '../components/HomePage/ButtonBar';
import SleepyActionOutput from '../components/HomePage/SleepyActionOutput';
import RandomDogOutput from '../components/HomePage/RandomDogOutput';

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <Banner />
                <ButtonBar />
                <SleepyActionOutput />
                <RandomDogOutput />
            </React.Fragment>
        );
    }
}

export default HomePage;