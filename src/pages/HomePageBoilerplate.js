import React, { Component } from 'react';

import Banner from '../components/HomePageBoilerplate/Banner';
import ButtonBar from '../components/HomePageBoilerplate/ButtonBar';
import SleepyActionOutput from '../components/HomePageBoilerplate/SleepyActionOutput';
import RandomDogOutput from '../components/HomePageBoilerplate/RandomDogOutput';

class HomePageBoilerplate extends Component {
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

export default HomePageBoilerplate;