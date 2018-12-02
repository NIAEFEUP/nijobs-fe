import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter} from 'react-router-dom';

import { exampleAction } from '../../actions/exampleActions';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, Grid, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
      ...theme.mixins.gutters(),
      margin: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    button: {
        textAlign: 'center'
    },
  });

class HomePage extends Component {
    


    btnOnClick = () => {
        this.props.exampleAction();
    }

    
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper} elevation={5}>
                                <Typography variant="h5" component="h3">
                                    Welcome to the Home Page
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={4} className={classes.button}>
                            <Button 
                                variant="contained"
                                color="primary"
                                onClick={this.btnOnClick}
                            >
                                Hello World
                            </Button>
                        </Grid>
                        <Grid item xs={4} className={classes.button}>
                            <Button
                                variant="text"
                                color="secondary"
                                component={Link}
                                to="/example"
                            >
                                Example Link
                            </Button>
                        </Grid>
                        <Grid item xs={4} className={classes.button}>
                            <Button
                                variant="text"
                                color="secondary"
                                component={Link}
                                to="/other/2"
                            >
                                Example Link with URL Params
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="subtitle1">
                        {this.props.example.foo ?
                            (this.props.example.waiting ?
                                "Wait for it..."
                            :
                                "Click Hello World and wait 2 seconds"
                            )
                        :
                            "You just called a Redux Action!"
                        }

                    </Typography>
                </Paper>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    example: state.example
});

const mapActionsToProps = {
    exampleAction
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(HomePage)));