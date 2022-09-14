import { useMemo, useEffect } from "react";

import qs from "qs";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import useOffersSearcher from "./SearchResultsArea/SearchResultsWidget/useOffersSearcher";
import { SearchResultsConstants } from "./SearchResultsArea/SearchResultsWidget/SearchResultsUtils";

const URLSearchParamsParser = ({ showSearchResults }) => {

    const location = useLocation();

    const offerSearch = useSelector((state) => state.offerSearch);
    const validQueryParams = Object.keys(offerSearch);

    const queryParams = useMemo(() => qs.parse(location.search, {
        ignoreQueryPrefix: true,
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []);

    const { search: searchOffers } = useOffersSearcher({
        value: queryParams.searchValue,
        jobMaxDuration: queryParams.jobMaxDuration,
        jobMinDuration: queryParams.jobMinDuration,
        jobType: queryParams.jobType,
        fields: queryParams.fields,
        technologies: queryParams.technologies,
    });

    // we specifically want this to only run once to avoid infinite re-renders
    useEffect(() => {

        // filter to make sure we only submit form data if valid search params are present
        if (Object.keys(queryParams).filter((key) => validQueryParams.includes(key)).length) {
            searchOffers(SearchResultsConstants.INITIAL_LIMIT);

            showSearchResults();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};

export default URLSearchParamsParser;
