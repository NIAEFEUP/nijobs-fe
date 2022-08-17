/* istanbul ignore file */
import { useState, useCallback } from "react";

/**
 * Custom hook for state variables that have a special boolean state only
 */
const useAuthPageSwitcher = () => {
    const [loginActive, setLoginActive] = useState(true);
    const [recoveryRequestActive, setRecoveryRequestActive] = useState(false);
    const [recoveryFinishActive, setRecoveryFinishActive] = useState(false);

    const switchLogin = useCallback(
        () => {
            setLoginActive(true);
            setRecoveryRequestActive(false);
            setRecoveryFinishActive(false);
        }, []
    );

    const switchRecoveryRequest = useCallback(
        () => {
            setLoginActive(false);
            setRecoveryRequestActive(true);
            setRecoveryFinishActive(false);
        }, []
    );

    const switchRecoveryFinish = useCallback(
        () => {
            setLoginActive(false);
            setRecoveryRequestActive(false);
            setRecoveryFinishActive(true);
        }, []
    );


    return [
        loginActive,
        recoveryRequestActive,
        recoveryFinishActive,
        switchLogin,
        switchRecoveryRequest,
        switchRecoveryFinish,
    ];
};

export default useAuthPageSwitcher;
