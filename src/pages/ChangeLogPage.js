import { makeStyles, Typography } from "@material-ui/core";
import { format, isAfter, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addSnackbar } from "../actions/notificationActions";
import { fetchReleases } from "../services/changeLogService";
import { useMobile } from "../utils/media-queries";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const useStyles = makeStyles((theme) => ({
    content: ({ isMobile }) => ({
        padding: isMobile ? theme.spacing(0, 1) : theme.spacing(5),
    }),
    gray: {
        color: "rgba(0, 0, 0, 0.54)",
    },
    releaseContainer: {
        marginBottom: theme.spacing(4),
    },
    releaseHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    releaseDate: {
        marginRight: theme.spacing(2),
        color: theme.palette.primary.dark,
    },
    releaseContent: {
        padding: theme.spacing(2),
    },
}));

export const ChangeLogPage = ({ addSnackbar }) => {
    const isMobile = useMobile();
    const classes = useStyles({ isMobile: isMobile });

    const [releases, setReleases] = useState([]);
    const [lastUpdateTS, setLastUpdateTS] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const releases = await fetchReleases().then((releases) => {
                let lastTS = null;
                const filteredReleases = releases.map((release, idx) => {
                    const publishDate = parseISO(release.published_at);

                    if (lastTS === null || isAfter(publishDate, lastTS))
                        lastTS = publishDate;

                    return {
                        id: `release-${idx}`,
                        name: release.name,
                        date: format(publishDate, "dd-MM-yyyy"),
                        body: release.body,
                    };
                });

                if (lastTS !== null)
                    setLastUpdateTS(format(lastTS, "dd-MM-yyyy"));
                return filteredReleases;
            });
            setReleases(releases);
        };

        fetchData().catch((err) => {
            console.error(err);
            // setError(err[0]);
            // setIsLoading(false);

            addSnackbar({
                message:
                    "An unexpected error occurred, please try refreshing the browser window.",
                key: `${Date.now()}-fetchReleasesError`,
            });
        });
    }, []);

    return (
        <div className={classes.content}>
            <Typography
                variant="h3"
                id="Change-Log"
                data-id="Change-Log"
                gutterBottom
            >
                Changelog
            </Typography>

            <Typography className={classes.gray} paragraph={true}>
                {lastUpdateTS !== null
                    ? `Last updated: ${lastUpdateTS}`
                    : "No Releases available"}
            </Typography>

            {releases.map((release) => (
                <div key={release.id} className={classes.releaseContainer}>
                    <div className={classes.releaseHeader}>
                        <Typography variant="h5">{release.name}</Typography>
                        <Typography
                            variant="subtitle1"
                            className={classes.releaseDate}
                        >
                            {release.date}
                        </Typography>
                    </div>

                    <div className={classes.releaseContent}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {release.body}
                        </ReactMarkdown>
                    </div>
                </div>
            ))}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export default connect(null, mapDispatchToProps)(ChangeLogPage);
