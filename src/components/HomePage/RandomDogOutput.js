import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Paper, Typography } from '@material-ui/core';
import styles from "./HomePage.module.css";

class RandomDogOutput extends Component {
    // Functional component: Use to increase the code readability and modularity
    displayDoggo = () => {
        return (
            <React.Fragment>
                "Doggo ready!"<br/>
                <img src={this.props.dog.image_url} alt="random cute doggo" />
            </React.Fragment>
        );
    }

    render() {
        return (
            <Paper className={styles.paper} elevation={1}>
                <Typography variant="subtitle1">
                    {this.props.dog.loading ?
                        "Loading cute doggo..."
                        :
                        (this.props.dog.image_url ?
                            <this.displayDoggo />
                            :
                            "No random doggo currently loaded :("
                        )
                    }
                </Typography>
            </Paper>
        );
    }
};

const mapStateToProps = state => ({
    dog: state.dog
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(RandomDogOutput);