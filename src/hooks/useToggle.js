/* istanbul ignore file */
import { useState, useCallback } from "react";

/**
 * Custom hook for state variables that have a special boolean state only
 * @param {*} initialValue - initial boolean value of the state variable
 */
const useToggle = (initialValue) => {
    const [state, setState] = useState(initialValue);

    const toggleState = useCallback((value) => {
        setState((state) => (value === true || value === false) ? value : !state);
    }, []);

    const resetState = useCallback(() => {
        setState(initialValue);
    }, [initialValue]);

    return [state, toggleState, resetState];
};

export default useToggle;
