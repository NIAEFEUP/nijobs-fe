import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addSnackbar } from '../../actions/notificationActions';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core/styles';
import searchBarTheme from './SearchBarTheme.js';
import searchAreaStyle from "./SearchArea.module.css";




class SearchBar extends Component {

    static propTypes = {
        addSnackbar: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "", 
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submitSearch = e => {
        e.preventDefault();
        this.props.addSnackbar({
            message: `Search for: ${this.state.searchQuery}`,
            options: {
                variant: 'info',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            }
        });
    }

    submitSearchButton = classes => {
        return (
            <InputAdornment position="end">
                <IconButton onClick={this.submitSearch}>
                    <Icon
                        classes={{
                            root: classes.searchButton
                        }}
                    >
                        search
                    </Icon>

                </IconButton>
            </InputAdornment>
        );
    }

    render() {

        const {classes} = this.props;
        
        return (
            <React.Fragment>
                <form
                    onSubmit={this.submitSearch}
                    autoComplete="off"
                >
                    <TextField
                        id="search-bar"
                        label="Search"
                        className={searchAreaStyle.searchBar}
                        
                        value={this.state.searchQuery}
                        onChange={this.handleChange('searchQuery')}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            endAdornment: this.submitSearchButton(classes),
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                        }}
                        InputLabelProps={{
                            classes: {
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                                shrink: classes.cssLabelShrink,
                            },
                        }}
                    />
                </form>
                
            </React.Fragment>
                
            
        );
    }

}

const mapStateToProps = () => ({
});

const mapActionsToProps = {addSnackbar};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(searchBarTheme)(SearchBar));