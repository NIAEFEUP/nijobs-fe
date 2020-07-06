import React from "react";
import { RouterLink } from "../../../utils";
import { Typography } from "@material-ui/core";

const ProductDescription = React.forwardRef((props, ref) => (
    <div
        ref={ref}
        style={{ height: "500px" }}
    >
        <Typography>
                Other content, like what is this for and cool vector and stock images with no copyright
        </Typography>
        <Typography>
            {"Somewhere here will have the 'are you a company?"}
            <RouterLink to="/apply/company">Join Us</RouterLink>
            {"'"}
        </Typography>


    </div>
));

// Needed because of ForwardRef usage
ProductDescription.displayName = "ProductDescription";

export default ProductDescription;
