/* istanbul ignore file */
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";


const theme = responsiveFontSizes(createMuiTheme({
    palette: {
        primary: {
            main: "#DC4F47",
        },
        secondary: {
            main: "#4F1315",
        },
        tertiary: {
            main: "#C1D2D6",
        },
    },
    status: {
        danger: "orange",
    },
    typography: {
        fontFamily: [
            "Poppins",
            "Roboto",
            "sans-serif",
        ].join(","),
    },

}));
export default theme;
