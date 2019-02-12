import AppTheme, { darkTextColor } from '../../AppTheme';

export default ({
   
    root: {
        width: 200,
        
    },

    cssLabel: {
        color: darkTextColor,
    },
    cssLabelShrink: {},
    cssFocused: {},
    cssOutlinedInput: {
        
        '& $notchedOutline': {
            borderColor: darkTextColor,
        },

        '&$cssFocused $notchedOutline': {
            borderColor: AppTheme.palette.primary.main,
        },
    },
    notchedOutline: {},
    formControl: {},
    

    searchButton: {
        color: darkTextColor,
    },
});
  