/* istanbul ignore file */
import { useState, useCallback } from "react";

/**
 * Custom hook for managing which page is active
 *
 * @param initialPage - initial page number
 */
const useAuthPageSwitcher = (initialPage = 0) => {
    const [loginActive, setLoginActive] = useState(initialPage === 0);
    const [recoveryRequestActive, setRecoveryRequestActive] = useState(initialPage === 1);
    const [recoveryFinishActive, setRecoveryFinishActive] = useState(initialPage === 2);

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

    const reset = useCallback(
        () => {
            setLoginActive(initialPage === 0);
            setRecoveryRequestActive(initialPage === 1);
            setRecoveryFinishActive(initialPage === 2);
        },
        [initialPage],
    );


    return [
        loginActive,
        recoveryRequestActive,
        recoveryFinishActive,
        switchLogin,
        switchRecoveryRequest,
        switchRecoveryFinish,
        reset,
    ];
};

export default useAuthPageSwitcher;
