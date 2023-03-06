import React, { useState } from "react";
import PropTypes from "prop-types";
import { editOffer } from "../../../services/offerService";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowDownward, Edit } from "@material-ui/icons";
import { Controller, useForm } from "react-hook-form";

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

const OfferEndDateQuickEdit = ({ offerId, dateValue, setOfferId }) => {
    const stylings = useStyles();
    const [isEditingDate, setEditingDate] = useState(false);
    const [currentDate, setCurrentDate] = useState(dateValue);
    const { control } = useForm();

    const changeOfferPublishEndDateTo = (newPublishEndDate) => {
        editOffer({ offerId: offerId, publishEndDate: newPublishEndDate })
            .then((obj) => {
                setCurrentDate(newPublishEndDate.split('T')[0]);
            })
            .catch((err) => {
                console.log(err);
            });

        setEditingDate(false);
    };

    return (
        <>
            <span id={`end-publish-date-${offerId}`}>
                {currentDate.split('T')[0]}
            </span>

            {isEditingDate ?
                <Controller
                    name="quickEditPublishEndDate"
                    render={(
                        { field: { onChange, onBlur, name, value } },
                    ) =>  (
                        <>
                            <DatePicker
                                open={isEditingDate}
                                value={value}
                                id="quickEditPublishEndDate-input"
                                name={name}
                                onChange={(event) => {
                                    changeOfferPublishEndDateTo(event.toISOString());
                                    setEditingDate(false);
                                }}
                                onBlur={onBlur}
                                variant="inline"
                                autoOk
                                format="yyyy-MM-dd"
                                defaultValue={Date.parse(currentDate)}
                                className={stylings.datePicker}
                                PopoverProps={{
                                    anchorEl: document.getElementById(`end-publish-date-${offerId}`),
                                }}
                            />
                            <ArrowDownward
                                className={stylings.icon}
                            />
                        </>
                    )
                    }
                    control={control}
                /> :
                <>
                    <Edit
                        className={stylings.icon} onClick={() => {
                            setEditingDate(true);
                        }}
                    />
                </>}
        </>
    );
};

OfferEndDateQuickEdit.propTypes = {
    offerId: PropTypes.string.isRequired,
    dateValue: PropTypes.string.isRequired,
};

export default OfferEndDateQuickEdit;
