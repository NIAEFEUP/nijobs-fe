/* istanbul ignore file */
// Ignoring file because it was based on a material-ui component which is already tested there

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import { Close, ArrowDropDown } from "@material-ui/icons";

import useMultiOptionAutocompleteStyles from "./MultiOptionAutocompleteStyles";
import useSearchAreaStyles from "../../../SearchArea/searchAreaStyle";

const MultiOptionAutocomplete = (props) => {

    const {
        className,
        ChipProps,
        chipWrapperProps,
        closeIcon = <Close fontSize="small" />,
        disableClearable = false,
        disabled = false,
        forcePopupIcon = "auto",
        getOptionLabel = (x) => x,
        ListboxComponent = "ul",
        ListboxProps,
        loading = false,
        PaperComponent = Paper,
        PopperComponent = Popper,
        popupIcon = <ArrowDropDown />,
        renderInput,
        size = "medium",
        autocompleteProps,
        ...otherProps
    } = props;

    const clearText = "Clear";
    const closeText = "Close";
    const openText = "Open";
    const loadingText = "Loading...";
    const noOptionsText = "No Options";

    const classes = useMultiOptionAutocompleteStyles();
    const searchAreaClasses = useSearchAreaStyles();

    const {
        getRootProps,
        getInputProps,
        getInputLabelProps,
        getPopupIndicatorProps,
        getClearProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        value,
        dirty,
        id,
        popupOpen,
        focused,
        focusedTag,
        anchorEl,
        setAnchorEl,
        inputValue,
        groupedOptions,
    } = autocompleteProps;

    const renderOption = getOptionLabel;

    const renderListOption = (option, index) => {
        const optionProps = getOptionProps({ option, index });

        return (
            <li {...optionProps} className={classes.option}>
                {renderOption(option, {
                    selected: optionProps["aria-selected"],
                    inputValue,
                })}
            </li>
        );
    };

    // This is workaround spaghetti.
    // Normally, useAutocomplete uses the Backspace keydown event to delete options in the input,
    // but since we are showing them separately, it doesn't make sense for backspace to unselect options outside of the input
    const rootProps = {
        ...getRootProps(),
        onKeyDown: (event) => (event.key !== "Backspace") && getRootProps().onKeyDown(event),
    };

    return (
        <React.Fragment>
            <div
                className={clsx(
                    classes.root,
                    {
                        [classes.focused]: focused,
                    },
                    className,
                )}
                {...rootProps}
                {...otherProps}
            >
                {renderInput({
                    id,
                    disabled,
                    size: size === "small" ? "small" : undefined,
                    InputLabelProps: getInputLabelProps(),
                    InputProps: {
                        ref: setAnchorEl,
                        className: classes.inputRoot,
                        endAdornment: (
                            <div className={classes.endAdornment}>
                                {disableClearable || disabled ? null : (
                                    <IconButton
                                        {...getClearProps()}
                                        aria-label={clearText}
                                        title={clearText}
                                        className={clsx(classes.clearIndicator, {
                                            [classes.clearIndicatorDirty]: dirty,
                                        })}
                                    >
                                        {closeIcon}
                                    </IconButton>
                                )}

                                {forcePopupIcon === true ? (
                                    <IconButton
                                        {...getPopupIndicatorProps()}
                                        disabled={disabled}
                                        aria-label={popupOpen ? closeText : openText}
                                        title={popupOpen ? closeText : openText}
                                        className={clsx(classes.popupIndicator, {
                                            [classes.popupIndicatorOpen]: popupOpen,
                                        })}
                                    >
                                        {popupIcon}
                                    </IconButton>
                                ) : null}
                            </div>
                        ),
                    },
                    inputProps: {
                        className: clsx(classes.input, {
                            [classes.inputFocused]: focusedTag === -1,
                        }),
                        disabled,
                        ...getInputProps(),
                    },
                })}
                <div {...chipWrapperProps} className={searchAreaClasses.chipListWrapper}>
                    {value.map((option, index) => (
                        <Chip
                            key={getOptionLabel(option)}
                            label={getOptionLabel(option)}
                            size={size}
                            {...getTagProps({ index })}
                            {...ChipProps}
                        />
                    ))}
                </div>
            </div>
            {popupOpen && anchorEl ? (
                <PopperComponent
                    className={clsx(classes.popper)}
                    style={{
                        width: anchorEl.clientWidth,
                    }}
                    role="presentation"
                    anchorEl={anchorEl}
                    open
                >
                    <PaperComponent className={classes.paper}>
                        {loading && groupedOptions.length === 0 ? (
                            <div className={classes.loading}>
                                {loadingText}
                            </div>
                        ) : null}
                        {groupedOptions.length === 0 && !loading ? (
                            <div className={classes.noOptions}>
                                {noOptionsText}
                            </div>
                        ) : null}
                        {groupedOptions.length > 0 ? (
                            <ListboxComponent
                                className={classes.listbox}
                                {...getListboxProps()}
                                {...ListboxProps}
                            >
                                {groupedOptions.map((option, index) => renderListOption(option, index))}
                            </ListboxComponent>
                        ) : null}
                    </PaperComponent>
                </PopperComponent>
            ) : null}
        </React.Fragment>
    );
};

MultiOptionAutocomplete.propTypes = {
    autocompleteProps: PropTypes.object.isRequired,
    ChipProps: PropTypes.object,
    chipWrapperProps: PropTypes.object,
    classes: PropTypes.object,
    className: PropTypes.string,
    clearText: PropTypes.string,
    closeIcon: PropTypes.node,
    closeText: PropTypes.string,
    disableClearable: PropTypes.bool,
    disabled: PropTypes.bool,
    forcePopupIcon: PropTypes.oneOfType([PropTypes.oneOf(["auto"]), PropTypes.bool]),
    getOptionLabel: PropTypes.func,
    id: PropTypes.string,
    inputValue: PropTypes.string,
    ListboxComponent: PropTypes.elementType,
    ListboxProps: PropTypes.object,
    loading: PropTypes.bool,
    loadingText: PropTypes.node,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    onInputChange: PropTypes.func,
    options: PropTypes.array,
    PaperComponent: PropTypes.elementType,
    PopperComponent: PropTypes.elementType,
    popupIcon: PropTypes.node,
    renderInput: PropTypes.func.isRequired,
    renderOption: PropTypes.func,
    size: PropTypes.oneOf(["medium", "small"]),
    value: PropTypes.any,
};

export default MultiOptionAutocomplete;
