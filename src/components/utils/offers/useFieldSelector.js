import FIELD_OPTIONS from "./FieldOptions";
import { useCallback } from "react";


export default (value, setValues) => {
    const FieldsAutocompleteProps = {
        label: "Fields",
        placeholder: "Fields",
        multiple: true,
        options: Object.keys(FIELD_OPTIONS),
        id: "fields",
        getOptionLabel: (option) => FIELD_OPTIONS[option],
        onChange: useCallback((e, value) => value && setValues(value), [setValues]),
        value: value,
        inputProps: {
            "data-testid": "fields",
        },
    };

    return FieldsAutocompleteProps;
};
