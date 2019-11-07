import React, { useRef } from "react";
import PropTypes from "prop-types";

const ProductDescription = ({ setRef }) => {

    const ref = useRef(null);
    setRef(ref);

    return (
        <div
            ref={ref}
            style={{ height: "500px" }}
        >
                Other content, like what is this for and cool vector and stock images with no copyright
        </div>
    );
};

ProductDescription.propTypes = {
    setRef: PropTypes.func.isRequired,
};

export default ProductDescription;
