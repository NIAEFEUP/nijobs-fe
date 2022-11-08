/* istanbul ignore file */
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthPage } from "../actions/navbarActions";

/**
 * Custom hook for managing which page is active
 *
 * @param numPages - number of pages
 * @param initialPage - initial page number
 */
const usePageSwitcher = (numPages, initialPage) => {
    const dispatch = useDispatch();
    const modalPage = useSelector((state) => state.navbar.authModalPage);

    const activePages = useMemo(() => Array.from(Array(numPages)).map((_, idx) => idx === modalPage),
        [modalPage, numPages]);
    const setActivePages = useMemo(() => Array.from(Array(numPages)).map((_, idx) => () => dispatch(setAuthPage(idx))),
        [dispatch, numPages]);

    const reset = useCallback(
        () => dispatch(setAuthPage(initialPage)),
        [dispatch, initialPage],
    );

    return [
        activePages,
        setActivePages,
        reset,
    ];
};

export default usePageSwitcher;
