/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

export default ({ isMobile }) => makeStyles((theme) => ({
    productDescription: {
        display: "flex",
        justifyContent: "center",
        width: isMobile ? "100%" : "80%",
        margin: "5em auto 10em",
        textAlign: "center",
    },
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
    companyName: {
        fontWeight: "bold",
    },
    productDescriptionGrid: {
        "& > div": {
            padding: isMobile ? theme.spacing(5, 1) : theme.spacing(5, 5),
        },
    },
}));
