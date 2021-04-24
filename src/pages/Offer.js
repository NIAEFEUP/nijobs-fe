import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import OfferContent from "../components/HomePage/SearchResultsArea/Offer/OfferContent";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import config from "../config";
import NotFound from "./NotFound";
const { API_HOSTNAME } = config;

class OfferComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            offer: null,
        };
    }

    async getOffer(id) { // TODO: deal with errors
        try {
            const res = await fetch(`${API_HOSTNAME}/offers/${id}`, {
                method: "GET",
            });
            if (!res.ok) {
                return null;
            }
            const offerData = await res.json();
            this.setState({ offer: new Offer(offerData) });
        } catch (error) {
            return null;
        }
        return null;
    }

    render() {
        this.getOffer(this.state.id);
        if (this.state.offer) {
            return (
                <React.Fragment>
                    <OfferContent offer={this.state.offer} isPage />
                </React.Fragment>
            );
        }
        return <NotFound />;
    }
}

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
