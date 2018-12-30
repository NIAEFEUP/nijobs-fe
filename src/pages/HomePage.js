import React, { Component } from 'react'

import Banner from '../components/HomePage/Banner';
import ButtonBar from '../components/HomePage/ButtonBar';
import SleepyActionOutput from '../components/HomePage/SleepyActionOutput';

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <Banner />
                <ButtonBar />
                <SleepyActionOutput />
            </React.Fragment>
        )
    }
}

export default HomePage;