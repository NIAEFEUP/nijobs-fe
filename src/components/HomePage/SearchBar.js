import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { withStyles } from '@material-ui/core/styles';
import searchBarTheme from './SearchBarTheme.js';




class SearchBar extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        className: PropTypes.string,
        searchValue: PropTypes.string.isRequired,
        updateSearchValue: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            labelWidth: 0,
        };
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    handleChange = e => {
        this.props.updateSearchValue(e.target.value);
    };

    render() {

        const { classes, searchValue, className } = this.props;
        
        return (
            <FormControl
                variant="outlined"
                className={`${classes.input} ${className}`}
                value={searchValue}
                onChange={this.handleChange}
            >
                <InputLabel
                    ref={ref => {
                        this.InputLabelRef = ref;
                    }}
                    htmlFor="search-bar"
                    classes={{
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                        shrink: classes.cssLabelShrink,
                    }}
                >
                    Search
                </InputLabel>
                <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name="search"
                    id="search-bar"
                    // endAdornment={submitSearchButton(classes, this.props.submitSearchForm)}
                    classes={{
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                        // formControl: classes.formControl,
                        // adornedEnd: classes.adornedEnd,
                    }}
                />

            </FormControl>
        );
    }

}


export default (withStyles(searchBarTheme)(SearchBar));

