/* istanbul ignore file */
import { useState, useCallback } from "react";

/**
 * Custom hook for state variables that have a special boolean state only
 * @param {*} initialValue - initial boolean value of the state variable
 */
const useToggle = (initialValue) => {
    const [state, setState] = useState(initialValue);

    const toggleState = useCallback(() => {
        setState((state) => !state);
    }, []);

    const resetState = useCallback(() => {
        setState(false);
    }, []);

    return [state, toggleState, resetState];
};

export default useToggle;
