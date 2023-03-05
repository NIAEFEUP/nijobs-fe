import React, { useState } from "react";
import PropTypes from "prop-types";
import { editOffer } from "../../../services/offerService";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { CheckCircleOutline, Edit } from "@material-ui/icons";
import { Controller, useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    datePicker: {
        width: 100,
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

    const changeOfferPublishEndDate = () => {
        editOffer({ offerId: offerId, publishEndDate: "2023-04-20T00:00:00+01:00" })
            .then((obj) => {
                console.log("Obj: ", obj.publishEndDate);
            })
            .catch((err) => {
                console.log(err);
            });

        setEditingDate(false);
    };

    return (
        <>
            {isEditingDate ?
                <Controller
                    name="quickEditPublishEndDate"
                    render={(
                        { field: { onChange, onBlur, name, value } },
                    ) =>  (
                        <>
                            <DatePicker
                                value={value}
                                id="quickEditPublishEndDate-input"
                                name={name}
                                onChange={(event) => {
                                    onChange(event);
                                }}
                                onBlur={onBlur}
                                variant="inline"
                                autoOk
                                format="yyyy-MM-dd"
                                className={stylings.datePicker}
                            />
                            <CheckCircleOutline className={stylings.icon, stylings.submitEditIcon} onClick={changeOfferPublishEndDate} />
                        </>
                    )
                    }
                    control={control}
                /> :
                <>
                    <span>
                        {currentDate}
                    </span>
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
