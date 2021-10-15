import { Grid, TextField, Typography } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";
import { searchCities } from "../../services/locationSearchService";

// Based on https://github.com/lodash/lodash/issues/4700#issuecomment-805439202
const asyncThrottle = (func, wait) => {
    const throttled = throttle((resolve, reject, args) => {
        func(...args).then(resolve).catch(reject);
    }, wait);
    return (...args) =>
        new Promise((resolve, reject) => {
            throttled(resolve, reject, args);
        });
};


const LocationPicker = ({ name, value, onChange, onBlur,  error, disabled }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCitiesThrottled = useCallback(
        asyncThrottle(searchCities, 1500),
        [],
    );

    const parseCustomLocation = useCallback(
        (loc) => loc.trimStart() || null,
        []
    );

    const parsePresetLocation = useCallback(
        (loc) => `${loc.city}, ${loc.country}`,
        []
    );

    const isCustomLocation = useCallback(
        (loc) => typeof loc === "string",
        []
    );

    const parseNewLocation = useCallback(
        (location) => {
            let value;

            if (!location) {
                value = location;
            } else {
                value = isCustomLocation(location)
                    ? parseCustomLocation(location)
                    : parsePresetLocation(location);
            }
            return value;
        },
        [parseCustomLocation, parsePresetLocation, isCustomLocation]
    );

    useEffect(() => {

        if (inputValue === "") {
            setOptions(value ? [value] : []);
            return undefined;
        }
        if (inputValue.length < 3) return undefined;

        setLoading(true);
        fetchCitiesThrottled(inputValue)
            .then((results) => {
                setLoading(false);
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);

            })
            .catch(() => {
                setLoading(false);
                setOptions(value);
            });

        return undefined;

    }, [value, inputValue, fetchCitiesThrottled]);

    return (
        <Autocomplete
            getOptionLabel={(option) => parseNewLocation(option)}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            autoSelect
            includeInputInList
            filterSelectedOptions
            freeSolo
            loading={loading}
            value={value}
            inputValue={inputValue}
            name={name}
            disabled={disabled}
            onBlur={onBlur}
            onChange={(e, newValue) => {
                const value = parseNewLocation(newValue);
                setOptions(value ? [value, ...options] : options);
                onChange(e, value);
            }}
            onInputChange={(e, newInputValue) => {
                const value = newInputValue.trimStart();
                setInputValue(value);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a location" variant="outlined" fullWidth
                    error={!!error}
                    helperText={
                        `${error?.message || ""}`
                    }
                />
            )}
            renderOption={(option) => (
                option.city && option.country
                    ? (
                        <Grid container alignItems="center">
                            <Grid item>
                                <LocationOn />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body1">
                                    {`${option.city}, ${option.country}`}
                                </Typography>
                            </Grid>
                        </Grid>)
                    : <></>
            )}
        />
    );
};

LocationPicker.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    error: PropTypes.any,
    disabled: PropTypes.bool,

};

export default LocationPicker;
