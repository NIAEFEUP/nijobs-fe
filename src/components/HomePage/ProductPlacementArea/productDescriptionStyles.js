/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    productDescription: ({ isMobile }) => ({
        display: "flex",
        justifyContent: "center",
        width: isMobile ? "100%" : "80%",
        margin: "5em auto",
        textAlign: "center",
    }),
    productDescriptionSVG: {
        width: "150px",
        height: "150px",
    },
    productDescriptionAnchor: {
        width: "100%",
        height: "100%",
        "&:hover": {
            textDecoration: "none",
        },
    },
}))
;
