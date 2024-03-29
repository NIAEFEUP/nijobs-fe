import React from "react";
import {
    DialogContent,
    Card,
    CardHeader,
    CardContent,
    Typography,
    makeStyles,
    Link,
} from "@material-ui/core";
import { rules } from "./rules";
import { RouterLink } from "../../utils";
import { useMobile } from "../../utils/media-queries";
import Constants from "../../utils/Constants";

const useStyles = makeStyles((theme) => ({
    ruleCard: {
        marginBottom: theme.spacing(2),
    },
    cardLink: {
        display: "inline-block",
        marginTop: theme.spacing(1),
    },
}));

// Writing on rules.js adds "Accordions" with json's data. You may add a title, a description,
// a link and a linkName, if link is different than "", a button appears, this button will have, linkName's
// text, clicking it will take you to a page inside NIJobs as the link is just the path part of router-dom's
// <Link> component.

const RulesComponent = () => {
    const classes = useStyles();
    const isMobile = useMobile();
    const ContentComponent = isMobile ? DialogContent : CardContent;
    return (
        <>
            {!isMobile && <CardHeader title="Rules" titleTypographyProps={{ variant: "h3" }} />}
            <ContentComponent>
                <Typography variant="body2" paragraph gutterBottom>
                    For further clarification contact us via:
                    {" "}
                    <Link color="secondary" href={`mailto:${Constants.CONTACT_US_EMAIL}`}>
                        {Constants.CONTACT_US_EMAIL}
                    </Link>
                </Typography>
                {rules.map(({ title, description, link, linkName }, i) => (
                    <Card key={i} className={classes.ruleCard}>
                        <CardHeader title={title} titleTypographyProps={{ variant: "body1" }} />
                        <CardContent>
                            <Typography variant="body2">
                                {description}
                            </Typography>
                            {link &&
                                <RouterLink to={link} className={classes.cardLink}>
                                    {linkName}
                                </RouterLink>
                            }
                        </CardContent>
                    </Card>
                ))}
            </ContentComponent>
        </>
    );
};
export default RulesComponent;
