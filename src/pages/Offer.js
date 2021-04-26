import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useParams, Redirect, useLocation } from "react-router-dom";

import OfferContent from "../components/HomePage/SearchResultsArea/Offer/OfferContent";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import { getOffer } from "../services/getOfferService";

const OfferComponent = ({ id }) => { // TODO: use OfferPageController
    const _amMounted = useRef(); // Prevents setState calls from happening after unmount
    const [offer, setOffer] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        _amMounted.current = true;
        // eslint-disable-next-line no-unused-vars
        const offerPromise = getOffer(id)
            .then((offer) => {
                if (_amMounted.current) {
                    setOffer(new Offer(offer));
                    setLoading(false);
                }
            })
            .catch(() => {
                if (_amMounted.current) {
                    setError("UnexpectedError");
                    setLoading(false);
                }
            });
        return () => {
            _amMounted.current = false;
        };
    }, [id]);

    if (error === null) {
        return (
            <React.Fragment>
                <OfferContent offer={offer} isPage loading={loading} />
            </React.Fragment>
        );
    }
    return (
        <Redirect
            to={{
                pathname: `/not-found${location.pathname} `,
                state: {
                    from: location,
                    message: `The offer with id ${id} is hidden or does not exist.`,
                },
            }}
        />
    );
};

OfferComponent.propTypes = {
    id: PropTypes.string,
};

const OfferPage = () => {
    const { id } = useParams();
    return (
        <React.Fragment>
            <OfferComponent id={id} />
        </React.Fragment>
    );
};

export default OfferPage;
