import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFields, setTechs, setLoadUrlFromFilters } from "../../../../actions/searchOffersActions";

import useSearchParams from "../../SearchArea/useUrlSearchParams";
import { SearchResultsConstants } from "../SearchResultsWidget/SearchResultsUtils";
import useOffersSearcher from "../SearchResultsWidget/useOffersSearcher";

export default () => {
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

    const addField = useCallback((value) => dispatch(setFields([...fields, value])), [dispatch, fields]);
    const addTech = useCallback((value) => dispatch(setTechs([...techs, value])), [dispatch, techs]);

    const {
        setFields: urlSetFields,
        setTechs: urlSetTechs,
    } = useSearchParams({
        setFields: (value) => dispatch(setFields(value)),
        setTechs: (value) => dispatch(setTechs(value)),
    });

    const addFieldWithUrl = useCallback((value) => {
        /* istanbul ignore else */
        if (!fields.includes(value)) {
            urlSetFields([...fields, value]);
            setSearch(true);
        }
    }, [fields, urlSetFields]);

    const addTechWithUrl = useCallback((value) => {
        /* istanbul ignore else */
        if (!techs.includes(value)) {
            urlSetTechs([...techs, value]);
            setSearch(true);
        }
    }, [techs, urlSetTechs]);

    useEffect(() => {
        /* istanbul ignore else */
        if (search) {
            searchOffers(SearchResultsConstants.INITIAL_LIMIT);
            setSearch(false);
        }
    }, [searchOffers, fields, techs, search]);

    return {
        addField,
        addTech,
        addFieldWithUrl,
        addTechWithUrl,
        setLoadUrlFromFilters: (value) => dispatch(setLoadUrlFromFilters(value)),
    };
};
