import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#C03736'
        },
        secondary: {
            main: '#4F1315'
        },
        tertiary: {
            main: '#C1D2D6'
        }
    },
    status: {
        danger: 'orange',
    },
    typography: {
        fontFamily: [
            'Poppins',
            'Roboto',
            'sans-serif',
        ].join(','),
        useNextVariants: true,
    },

}); 
export default theme;

export const primaryColor = '#C03736';
export const secondaryColor = '#4F1315';
export const tertiaryColor = '#C1D2D6';
export const darkTextColor = '#2C3031';