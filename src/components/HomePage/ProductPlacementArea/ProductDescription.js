import React from "react";

const ProductDescription = React.forwardRef((props, ref) => (
    <div ref={ref} style={{ height: "500px" }}>
        Other content, like what is this for and cool vector and stock images with no copyright
    </div>
));

// Needed because of ForwardRef usage
ProductDescription.displayName = "ProductDescription";


export default ProductDescription;
