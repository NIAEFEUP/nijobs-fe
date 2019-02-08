import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));

const styles = theme => ({
    input: {
        display: 'flex',
        minWidth: 200,
        maxWidth: 400,
        padding: '10px 0',
    },
    inputFocused: {
        '& $placeholder': {
            display: 'none'
        }
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    valueContainer: {
        display: 'flex',
        flex: 1,
        padding: `0 ${theme.spacing.unit * 2}px`,
        alignItems: 'center',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    placeholder: {
        position: 'absolute',
        left: `${theme.spacing.unit * 2}px`,
        fontSize: 16,
        width: '60%',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        overflowY: 'hidden',
    },

    chip: {
        margin: `0 ${theme.spacing.unit / 4}px`,
    },
});


const inputComponent = ({ inputRef, ...props }) => (
    <div
        ref={inputRef}
        {...props}
    />
);

inputComponent.propTypes = {
    inputRef: PropTypes.func.isRequired
};
  
const Control = ({ selectProps, innerRef, children, innerProps }) => {

    return (
        <TextField
            fullWidth
            variant='outlined'
            InputProps={{
                inputComponent,
                inputProps: {
                    className: selectProps.classes.input,
                    inputRef: innerRef,
                    children: children,
                    ...innerProps,
                },
                classes: {
                    focused: selectProps.classes.inputFocused,
                }
            }}
            
            {...selectProps.textFieldProps}
        />
    );

};

Control.propTypes = {
    selectProps: PropTypes.object.isRequired,
    innerRef: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired,
    innerProps: PropTypes.object.isRequired,
};


const NoOptionsMessage = ({ selectProps, children, innerProps }) => {
    return (
        <Typography
            color="textSecondary"
            className={selectProps.classes.noOptionsMessage}
            {...innerProps}
        >
            {children}
        </Typography>
    );
};

NoOptionsMessage.propTypes = {
    selectProps: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired,
    innerProps: PropTypes.object.isRequired,
};

const Option = ({innerRef, innerProps, children, isFocused, isSelected}) => {
    return (
        <MenuItem
            buttonRef={innerRef}
            selected={isFocused}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
            {...innerProps}
        >
            {children}
        </MenuItem>
    );
};

Option.propTypes = {
    isFocused: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    innerRef: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired,
    innerProps: PropTypes.object.isRequired,
};

const Placeholder = ({selectProps, innerProps, children}) => {
    return (
        <Typography
            color="textSecondary"
            className={selectProps.classes.placeholder}
            {...innerProps}
        >
            {children}
        </Typography>
    );
};

Placeholder.propTypes = {
    selectProps: PropTypes.object.isRequired,
    children: PropTypes.string.isRequired,
    innerProps: PropTypes.object,
};

const ValueContainer = ({selectProps, children}) => {
    return (
        <div className={selectProps.classes.valueContainer}>
            {children}
        </div>
    );
};

ValueContainer.propTypes = {
    selectProps: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired,
};

const MultiValue = ({children, selectProps, isFocused, removeProps}) => {
    return (
        <Chip
            tabIndex={-1}
            label={children}
            className={classNames(selectProps.classes.chip, {
                [selectProps.classes.chipFocused]: isFocused,
            })}
            onDelete={removeProps.onClick}
            deleteIcon={
                <Icon {...removeProps}>
                    cancel
                </Icon>
            }
        />
    );
};

MultiValue.propTypes = {
    selectProps: PropTypes.object.isRequired,
    isFocused: PropTypes.bool.isRequired,
    children: PropTypes.array.isRequired,
    removeProps: PropTypes.object.isRequired,
};

const components = {
    Control,
    NoOptionsMessage,
    Option,
    ValueContainer,
    MultiValue,
    Placeholder
};

class AutoComplete extends Component {
    state = {
        multi: null,
    };

    handleChange = name => value => {
        this.setState({
            [name]: value,
        });
    };

    render() {
        const { classes, theme, label } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <div className={classes.root}>
                <NoSsr>
                    <Select
                        classes={classes}
                        styles={selectStyles}
                        options={suggestions}
                        components={components}
                        value={this.state.multi}
                        onChange={this.handleChange('multi')}
                        placeholder={label}
                        isMulti
                    />
                </NoSsr>
            </div>
        );
    }
}

AutoComplete.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(AutoComplete);