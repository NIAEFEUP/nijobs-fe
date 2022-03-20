import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    bold: {
        fontWeight: 500,
    },
    gray: {
        color: "rgba(0, 0, 0, 0.54)",
    },
    content: ({ isMobile }) => ({
        padding: isMobile ? theme.spacing(0, 1) : theme.spacing(10),
    }),
}));
export { useStyles };
