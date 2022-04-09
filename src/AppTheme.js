/* istanbul ignore file */
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";


const theme = responsiveFontSizes(createTheme({
    palette: {
        primary: {
            main: "#DC4F47",
        },
        secondary: {
            main: "#4F1315",
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

// Add custom palette variants
theme.palette = {
    ...theme.palette,
    tertiary: theme.palette.augmentColor({
        main: "#C1D2D6",
    }),
    dark: theme.palette.augmentColor({
        main: "#333333",
    }),
};
export default theme;
