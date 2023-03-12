import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { editOffer } from "../../../services/offerService";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowDownward, Edit } from "@material-ui/icons";
import { getHumanError } from "../Form/OfferUtils";
import { useDispatch } from "react-redux";
import { addSnackbar } from "../../../actions/notificationActions";

const useStyles = makeStyles((theme) => ({
    datePicker: {
        display: "none",
    },
    icon: {
        height: 18,
        cursor: "pointer",
    },
    submitEditIcon: {
        cursor: "pointer",
        marginTop: theme.spacing(1),
    },
}));

const OfferEndDateQuickEdit = ({ offerId, dateValue }) => {
    const stylings = useStyles();
    const [isEditingDate, setEditingDate] = useState(false);
    const [currentDate, setCurrentDate] = useState(dateValue);

    const [editAbilityEnabled, setEditAbilityEnabled] = useState(true);

    const dispatch = useDispatch();
    const dispatchAddSnackbarAction = useCallback((notification) => {
        dispatch(addSnackbar(notification));
    }, [dispatch]);

    const changeOfferPublishEndDateTo = (newPublishEndDate) => {
        editOffer({ offerId: offerId, publishEndDate: newPublishEndDate })
            .then(() => {
                setCurrentDate(newPublishEndDate.split("T")[0]);
            })
            .catch((err) => {
                dispatchAddSnackbarAction({
                    message: `${getHumanError(err[0].msg)}`,
                });
            }).finally(() => {
                setEditingDate(false);
                setEditAbilityEnabled(true);
            });
    };

    const triggerStartChoosingDate = () => {
        if (editAbilityEnabled) {
            setEditingDate(true);
            setEditAbilityEnabled(false);
        }
    };

    return (
        <>
            <span id={`end-publish-date-${offerId}`}>
                {currentDate.split("T")[0]}
            </span>

            {isEditingDate ?
                <>
                    <DatePicker
                        open={isEditingDate}
                        value={Date.parse(currentDate)}
                        data-testid="quickEditPublishEndDate-input"
                        name="quickEditPublishEndDate-input"
                        onChange={(event) => {
                            changeOfferPublishEndDateTo(event.toISOString());
                            setEditingDate(false);
                        }}
                        variant="inline"
                        autoOk
                        format="yyyy-MM-dd"
                        className={stylings.datePicker}
                        PopoverProps={{
                            anchorEl: document.getElementById(`end-publish-date-${offerId}`),
                        }}
                    />
                    <ArrowDownward
                        className={stylings.icon}
                    />
                </> :
                <>
                    <Edit
                        className={stylings.icon}
                        onClick={triggerStartChoosingDate}
                        data-testid="QuickEndDateEditIcon"
                    />
                </>
            }
        </>
    );
};

OfferEndDateQuickEdit.propTypes = {
    offerId: PropTypes.string.isRequired,
    dateValue: PropTypes.string.isRequired,
};

export default OfferEndDateQuickEdit;
