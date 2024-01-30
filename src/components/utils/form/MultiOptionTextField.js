import { Box, Button, FormControl, FormHelperText, IconButton, TextField, Typography } from "@material-ui/core";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import React from "react";
import { Controller } from "react-hook-form";
import useMultiOptionTextFieldStyle from "./multiOptionTextFieldStyle";
import PropTypes from "prop-types";

const RemoveLineButton = ({ onClick, items, i }) => {
    const disabled = Object.keys(items).length <= 1;
    return (
        <FormControl>
            <span>
                <IconButton
                    aria-label={`Remove Entry ${i}`}
                    onClick={onClick}
                    disabled={disabled}
                >
                    <RemoveCircle />
                </IconButton>
            </span>
        </FormControl>
    );
};

RemoveLineButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    i: PropTypes.number.isRequired,
};

const MultiOptionTextField = ({
    label,
    itemLabelPrefix,
    controllerName,
    values,
    onAdd,
    onRemove,
    getValues,
    control,
    errors,
    disabled,
    textFieldProps,
    addEntryBtnTestId,
    id,
}) => {
    const classes = useMultiOptionTextFieldStyle();

    return (
        <>
            <Typography variant="h6">
                {label}
            </Typography>
            <Box id={id} display="flex" flexDirection="column">
                {values.map(({ id }, i) => (
                    <Controller
                        key={id}
                        name={`${controllerName}.${i}.value`}
                        render={(
                            { field: { onChange, onBlur, ref, name, value } },
                        ) => (
                            <TextField
                                name={name}
                                value={value}
                                label={`${itemLabelPrefix}${i + 1}`}
                                id={`${itemLabelPrefix}${i + 1}`}
                                error={!!errors?.[i]}
                                inputRef={ref}
                                onBlur={onBlur}
                                disabled={disabled}
                                onChange={onChange}
                                InputProps={{
                                    endAdornment:
    <RemoveLineButton i={i} items={values} onClick={() => onRemove(i)} />,
                                }}
                                margin="normal"
                                helperText={errors?.[i]?.value?.message || ""}
                                {...textFieldProps}
                            />)}
                        control={control}
                        defaultValue={getValues(`${controllerName}.${i}.value`) || ""}
                    />
                ))}
                <Button
                    color="primary"
                    startIcon={<AddCircle />}
                    disabled={disabled}
                    data-testid={addEntryBtnTestId}
                    onClick={() => onAdd()}
                    className={classes.addEntryBtn}
                >
                    Add Entry
                </Button>
                {errors ?
                    <FormHelperText error={!!errors}>
                        {errors.message}
                    </FormHelperText>
                    : <></>
                }
            </Box>
        </>
    );
};

MultiOptionTextField.propTypes = {
    label: PropTypes.string.isRequired,
    itemLabelPrefix: PropTypes.string.isRequired,
    controllerName: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any.isRequired,
        value: PropTypes.any,
    })),
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    getValues: PropTypes.func,
    control: PropTypes.any,
    errors: PropTypes.array,
    disabled: PropTypes.bool,
    textFieldProps: PropTypes.object,
    addEntryBtnTestId: PropTypes.string,
    id: PropTypes.string,
};

export default MultiOptionTextField;
