import React, { Component } from 'react';

import { TextField } from '@material-ui/core';
import searchAreaStyle from "./SearchArea.module.css";


class SearchBar extends Component {

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

    render() {
        return (
            <TextField
                id="outlined-name"
                label="Search"
                className={searchAreaStyle.searchBar}
                value={this.state.searchQuery}
                onChange={this.handleChange('searchQuery')}
                margin="normal"
                variant="outlined"
            />
                
            
        );
    }
}

export default SearchBar;