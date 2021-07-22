import React, { useEffect, useContext, useState } from "react";
import { useParams, Redirect } from "react-router-dom";

import OfferContent from "../components/HomePage/SearchResultsArea/Offer/OfferContent";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import { getOffer } from "../services/getOfferService";
import { CardContent } from "@material-ui/core";

export const OfferPageControllerContext = React.createContext();

export const OfferPageController = () => {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOffer(id)
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
    const redirectProps = {
        to: { pathname: "/not-found" },
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

const OfferPage = () => {

    const { offer, loading, error, redirectProps } = useContext(OfferPageControllerContext);

    if (error === null) {
        return (
            <CardContent>
                <OfferContent offer={offer} isPage loading={loading} />
            </CardContent>
        );
    }
    return (
        <Redirect {...redirectProps} />
    );
};

export default OfferPage;
