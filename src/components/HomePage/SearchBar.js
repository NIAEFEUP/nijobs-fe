import React, { Component } from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
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

    submitSearch = e => {
        e.preventDefault();
        console.log(`Search for: ${this.state.searchQuery}`);
    }

    submitSearchButton = () => {
        return (
            <InputAdornment position="end">
                <IconButton onClick={this.submitSearch}>
                    <Icon>
                        search
                    </Icon>

                </IconButton>
            </InputAdornment>
        );
    }

    render() {

        
        return (
            <React.Fragment>
                <form
                    onSubmit={this.submitSearch}
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-name"
                        label="Search"
                        className={searchAreaStyle.searchBar}
                        value={this.state.searchQuery}
                        onChange={this.handleChange('searchQuery')}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            endAdornment: this.submitSearchButton(),
                        }}
                    />
                </form>
                
            </React.Fragment>
                
            
        );
    }
}

export default SearchBar;