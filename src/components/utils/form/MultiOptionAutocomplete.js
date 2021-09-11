import React, { useCallback, forwardRef } from "react";
import { Autocomplete } from "@material-ui/lab";
import { Chip, TextField } from "@material-ui/core";
import useMultiOptionAutocompleteStyles from "./multiOptionAutocompleteStyle";

const MultiOptionAutocomplete = forwardRef(
    ({
        label,
        placeholder,
        value,
        options,
        onChange,
        onBlur,
        getOptionLabel,
    },
    ref) => {

        const valueRemover = useCallback((value) => (index) => (e) => {
            const clone = [...value];
            clone.splice(index, 1);
            onChange(e, clone);
        }, [onChange]);

        const onRemove = useCallback(valueRemover(value), [value]);

        const multiOptionAutocompleteClasses = useMultiOptionAutocompleteStyles();

        return (
            <div>
                <Autocomplete
                    multiple
                    id="tags-filled"
                    value={value}
                    options={options}
                    onChange={(e, val) => onChange(e, val)}
                    onBlur={onBlur}
                    getOptionLabel={getOptionLabel}
                    renderTags={() => null}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            margin="normal"
                            fullWidth
                            label={label}
                            placeholder={placeholder}
                            inputRef={ref}
                        />
                    )}
                />
                <div
                    className={multiOptionAutocompleteClasses.chipListWrapper}
                >
                    {value.map((option, index) => (
                        <Chip
                            key={getOptionLabel(option)}
                            label={getOptionLabel(option)}
                            data-testid="chip-option"
                            size="medium"
                            onDelete={onRemove(index)}
                        />
                    ))}
                </div>
            </div>);
    });

MultiOptionAutocomplete.displayName = "MultiOptionAutocomplete";

export default MultiOptionAutocomplete;
