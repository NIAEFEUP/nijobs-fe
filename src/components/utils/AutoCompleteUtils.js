import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { darkTextColor } from '../../AppTheme';

export const styles = theme => ({
    input: {
        display: 'flex',
        minWidth: 200,
        maxWidth: 400,
        padding: '10px 0',
        borderColor: darkTextColor
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
    chip: {
        margin: `0 ${theme.spacing.unit / 4}px`,
    },
    clearIndicator: {
        fontSize: '12px',
        padding: '6px'
    },
    dropdownIndicator: {
        padding: '6px'
    },
    cssLabel: {
        color: darkTextColor,
    },
    cssLabelHidden: {
        opacity: 0,
        '&$cssFocused': {
            opacity: 1
        } 
    },
    cssFocused: {},
    cssOutlinedInput: {
        
        '& $notchedOutline': {
            borderColor: darkTextColor,
        },
    },
    notchedOutline: {},
});


export const inputComponent = ({ inputRef, ...props }) => (
    <div
        ref={inputRef}
        {...props}
    />
);

inputComponent.propTypes = {
    inputRef: PropTypes.func.isRequired
};
  
export const Control = ({ selectProps, innerRef, children, innerProps }) => {

    const showLabel = selectProps.value.length === 0;
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
                    root: selectProps.classes.cssOutlinedInput,
                    focused: selectProps.classes.cssFocused,
                    notchedOutline: selectProps.classes.notchedOutline,
                }
            }}
            InputLabelProps={{
                classes:{
                    root: showLabel ? selectProps.classes.cssLabel : selectProps.classes.cssLabelHidden,
                    focused: selectProps.classes.cssFocused,
                    shrink: selectProps.classes.cssLabelShrink,
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


export const NoOptionsMessage = ({ selectProps, children, innerProps }) => {
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
    children: PropTypes.string.isRequired,
    innerProps: PropTypes.object,
};

export const ClearIndicator = ({innerProps, selectProps}) => {
    return (
        <IconButton 
            className={selectProps.classes.clearIndicator}    
            {...innerProps}
        >
            <Icon>
                cancel
            </Icon>

        </IconButton>
    );
};

ClearIndicator.propTypes = {
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired
};

export const DropdownIndicator = ({innerProps, selectProps}) => {
    return (
        <IconButton 
            className={selectProps.classes.dropdownIndicator}    
            {...innerProps}
        >
            <Icon>
                keyboard_arrow_down
            </Icon>

        </IconButton>
    );
};

DropdownIndicator.propTypes = {
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired
};

export const Option = ({innerProps, children, isFocused, isSelected}) => {
    return (
        <MenuItem
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
    children: PropTypes.string.isRequired,
    innerProps: PropTypes.object.isRequired,
};

export const ValueContainer = ({selectProps, children}) => {
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

export const MultiValue = ({children, selectProps, removeProps}) => {
    return (
        <Chip
            tabIndex={-1}
            label={children}
            className={selectProps.classes.chip}
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
    children: PropTypes.string.isRequired,
    removeProps: PropTypes.object.isRequired,
};