import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';

import { 
    styles,
    Control,
    NoOptionsMessage,
    Option,
    ValueContainer,
    MultiValue,
    ClearIndicator,
    DropdownIndicator,
} from './AutoCompleteUtils';

const components = {
    Control,
    NoOptionsMessage,
    Option,
    ValueContainer,
    MultiValue,
    ClearIndicator,
    DropdownIndicator
};

class AutoComplete extends Component {

    handleChange = value => {
        this.props.handleChange(value);
    };

    render() {
        const { classes, theme, label, name, value, suggestions, className, isMulti } = this.props;

        const multi = !!isMulti;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
            menu: base => ({
                ...base,
                zIndex: 10
            })
        };

        return (
            <div className={className}>
                <NoSsr>
                    <Select
                        classes={classes}
                        styles={selectStyles}
                        options={suggestions}
                        components={components}
                        value={value}
                        onChange={this.handleChange}
                        placeholder=''
                        name={name}
                        isMulti={multi}
                        textFieldProps={{
                            label
                        }}
                    />
                </NoSsr>
            </div>
        );
    }

}

AutoComplete.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    theme: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.shape({
            label: PropTypes.string
        })
    ]),
    suggestions: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    isMulti: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(AutoComplete);