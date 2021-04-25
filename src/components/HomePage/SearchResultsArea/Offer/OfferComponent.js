import { React } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OfferContent from "./OfferContent";

import Offer from "./Offer";
import { getOffer } from "../../../../services/getOfferService";

const OfferComponent = ({ offerId, offer, loading })  => {
    getOffer({ offerId }); // TODO: deal with getOffer
    return (
        <React.Fragment>
            <OfferContent offer={offer} isPage loading={loading} />
        </React.Fragment>
    );
};

OfferComponent.propTypes = {
    offerId: PropTypes.number,
    offer: PropTypes.instanceOf(Offer),
    loading: PropTypes.bool,
};

export const mapStateToProps = ({ getOffer }) => ({
    offer: getOffer.offer,
    loading: getOffer.loading,
    error: getOffer.error,
});

export const mapDispatchToProps = (dispatch) => ({
    getOffer: (id) => dispatch(getOffer(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferComponent);
