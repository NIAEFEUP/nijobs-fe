import { darkTextColor, } from '../../AppTheme';

export default ({
   
    root: {
        width: 200,
    },

    cssLabel: {
        color: darkTextColor,
    },
    cssLabelShrink: {
        '&$cssFocused': {
            color: darkTextColor,
        },
    },
    cssFocused: {},
    cssOutlinedInput: {
        
        '&$adornedEnd $notchedOutline': {
            borderColor: darkTextColor,
        },

        '&$cssFocused $notchedOutline': {
            borderColor: darkTextColor,
        },
    },
    notchedOutline: {},
    adornedEnd: {},
    

    searchButton: {
        color: darkTextColor,
    },
});
  