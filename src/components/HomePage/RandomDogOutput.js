import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';
import styles from "./HomePage.module.css";

class RandomDogOutput extends Component {
    // Functional component: Use to increase the code readability and modularity
    displayDoggo = () => {
        return (
            <React.Fragment>
                Doggo ready!
                <br/>
                <img
                    src={this.props.dog.imageUrl}
                    alt="random cute doggo"
                />
            </React.Fragment>
        );
    }

    render() {
        return (
            <Paper
                className={styles.paper}
                elevation={1}
            >
                <Typography variant="subtitle1">
                    {this.props.dog.loading ?
                        "Loading cute doggo..."
                        :
                        (this.props.dog.imageUrl ?
                            <this.displayDoggo />
                            :
                            "No random doggo currently loaded :("
                        )
                    }
                </Typography>
            </Paper>
        );
    }
}

RandomDogOutput.propTypes = {
    dog: PropTypes.object
};

const mapStateToProps = state => ({
    dog: state.dog
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(RandomDogOutput);