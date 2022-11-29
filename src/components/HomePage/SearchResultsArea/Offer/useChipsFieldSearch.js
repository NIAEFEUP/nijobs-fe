import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFields, setTechs } from "../../../../actions/searchOffersActions";

import useSearchParams from "../../SearchArea/useUrlSearchParams";
import { SearchResultsConstants } from "../SearchResultsWidget/SearchResultsUtils";
import useOffersSearcher from "../SearchResultsWidget/useOffersSearcher";

export const useChipsFieldSearch = () => {
    const dispatch = useDispatch();
    const fields = useSelector((state) => state.offerSearch.fields);
    const techs = useSelector((state) => state.offerSearch.technologies);
    const jobMaxDuration = useSelector((state) => state.offerSearch.jobMaxDuration);
    const jobMinDuration = useSelector((state) => state.offerSearch.jobMinDuration);
    const jobType = useSelector((state) => state.offerSearch.jobType);
    const searchValue = useSelector((state) => state.offerSearch.searchValue);

    const [search, setSearch] = useState(false);

    const { search: searchOffers } = useOffersSearcher({
        value: searchValue,
        jobMinDuration,
        jobMaxDuration,
        jobType,
        fields,
        technologies: techs,
    });

    const {
        setFields: urlSetFields,
        setTechs: urlSetTechs,
    } = useSearchParams({
        setFields: (value) => dispatch(setFields(value)),
        setTechs: (value) => dispatch(setTechs(value)),
    });

    const actualSetFields = useCallback((value) => {
        if (!fields.includes(value)) {
            urlSetFields([...fields, value]);
            setSearch(true);
        }
    }, [fields, urlSetFields]);

    const actualSetTechs = useCallback((value) => {
        if (!techs.includes(value)) {
            urlSetTechs([...techs, value]);
            setSearch(true);
        }
    }, [techs, urlSetTechs]);

    useEffect(() => {
        if (search) {
            searchOffers(SearchResultsConstants.INITIAL_LIMIT);
            setSearch(false);
        }
    }, [searchOffers, fields, techs, search]);

    return {
        setFields: actualSetFields,
        setTechs: actualSetTechs,
    };
};
