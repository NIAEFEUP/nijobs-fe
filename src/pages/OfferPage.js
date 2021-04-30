import React, { useEffect, useContext, useState } from "react";
import { useParams, Redirect, useLocation } from "react-router-dom";

import OfferContent from "../components/HomePage/SearchResultsArea/Offer/OfferContent";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import { getOffer } from "../services/getOfferService";
import { makeStyles } from "@material-ui/core";

export const OfferPageControllerContext = React.createContext();

export const OfferPageController = () => {
    const { id } = useParams();
    const [offer, setOffer] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const offerPromise = getOffer(id)
            .then((offer) => {
                setOffer(new Offer(offer));
                setLoading(false);
            })
            .catch(() => {
                setError("UnexpectedError");
            });
        return () => {
        };
    }, [id]);
    const redirectProps = { to: {
        pathname: "/not-found",
        state: {
            from: location,
            message: `The offer with id ${id} is hidden or does not exist.`,
        } },
    };

    return {
        controllerOptions: {
            initialValue: {
                offer,
                loading,
                error,
                redirectProps,
            },
        },
    };
};

const useStyles = makeStyles(() => ({
    offerCard: {
        maxWidth: "80%",
    },
}));

const OfferPage = () => {

    const classes = useStyles();
    const { offer, loading, error, redirectProps } = useContext(OfferPageControllerContext);

    if (error === null) {
        return (
            <div className={classes.offerCard}>
                <OfferContent offer={offer} isPage loading={loading} />
            </div>
        );
    }
    return (
        <Redirect {...redirectProps} />
    );
};

export default OfferPage;
