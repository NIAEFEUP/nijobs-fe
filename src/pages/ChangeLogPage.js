import { Divider, makeStyles, Typography } from "@material-ui/core";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addSnackbar } from "../actions/notificationActions";
import { fetchReleases } from "../services/changeLogService";
import { useMobile } from "../utils/media-queries";

const useStyles = makeStyles((theme) => ({
    content: ({ isMobile }) => ({
        padding: isMobile ? theme.spacing(0, 1) : theme.spacing(5),
    }),
    gray: {
        color: "rgba(0, 0, 0, 0.54)",
    },
    releaseDate: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export const ChangeLogPage = ({ addSnackbar }) => {
    const isMobile = useMobile();
    const classes = useStyles({ isMobile: isMobile });

    const [releases, setReleases] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const releases = await fetchReleases().then((releases) => {
                console.log("Releases -> ", releases);

                return releases.map((release, idx) => ({
                    id: `release-${idx}`,
                    name: release.name,
                    date: format(parseISO(release.published_at), "dd-MM-yyyy"),
                    body: release.body,
                }));
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
                Change Log
            </Typography>

            <Typography className={classes.gray} paragraph={true}>
                Last updated: March 1, 2022
                {/* GET FROM THE MOST UPDATED RELEASE */}
            </Typography>

            {releases.map((release) => (
                <div key={release.id}>
                    <Typography variant="h5" gutterBottom>
                        {release.name}
                    </Typography>

                    <Divider />

                    <Typography
                        variant="subtitle2"
                        className={classes.releaseDate}
                    >
                        {release.date}
                    </Typography>

                    <Typography variant="body1">{release.body}</Typography>
                </div>
            ))}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export default connect(null, mapDispatchToProps)(ChangeLogPage);
