import TECH_OPTIONS from "./TechOptions";
import { useCallback } from "react";


export default (value, setValues) => {
    const TechAutocompleteProps = {
        label: "Technologies",
        placeholder: "Technologies",
        multiple: true,
        options: Object.keys(TECH_OPTIONS),
        id: "tech-selector",
        getOptionLabel: (option) => TECH_OPTIONS[option],
        onChange: useCallback((e, value) => value && setValues(value), [setValues]),
        value: value,
    };

    const TechSelectorProps = {
        ...TechAutocompleteProps,
    };

    return TechSelectorProps;
};
