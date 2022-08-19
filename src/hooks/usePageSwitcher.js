/* istanbul ignore file */
import { useState, useCallback, useMemo } from "react";

/**
 * Custom hook for managing which page is active
 *
 * @param numPages - number of pages
 * @param initialPage - initial page number
 */
const usePageSwitcher = (numPages, initialPage = 0) => {
    const [activePage, setActivePage] = useState(initialPage);
    const activePages = useMemo(() => Array.from(Array(numPages)).map((_, idx) => idx === activePage), [activePage, numPages]);
    const setActivePages = useMemo(() => Array.from(Array(numPages)).map((_, idx) => () => setActivePage(idx)), [numPages]);

    const reset = useCallback(
        () => setActivePage(initialPage),
        [initialPage],
    );

    return [
        activePages,
        setActivePages,
        reset,
    ];
};

export default usePageSwitcher;
