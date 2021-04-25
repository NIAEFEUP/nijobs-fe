import { React } from "react";
import { useParams } from "react-router-dom";
import { OfferComponent } from "../components/HomePage/SearchResultsArea/Offer/OfferComponent";

export const OfferPage = () => {
    const { id } = useParams();
    return (
        <React.Fragment>
            <OfferComponent offerId={id} />
        </React.Fragment>
    );
};

export default OfferPage;
