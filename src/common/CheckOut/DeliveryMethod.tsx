import React, { useEffect, useState } from "react";
import { change } from "utils";
import {
    Button, CheckMarkEmptyIcon, CheckMarkIcon, CourierDeliveryIcon,
    ItemTypeToggle, LocationIcon, Modal, SelfDeliveryIcon,
    ViewFormatter
} from "components";

export const DeliveryMethod: React.FC<Props> = ({

    trigger,

    goToPaymentMethod

}) => {

    const [visibility, setVisibility] = useState(false);

    const [method, setMethod] = useState({

        route: "courier",

        date: "tomorrow",

        time: "12 : 00 pm"

    });

    const toggleOut = () => setVisibility(false);

    const setDeliveryTime = (time: string) => change(time, "time", setMethod);

    const setDeliveryDate = (date: string) => change(date, "date", setMethod);

    const deliveryDates = [

        {

            onClick: () => setDeliveryDate("tomorrow"),

            label: "Tomorrow",

            active: method.date === "tomorrow"

        },

        {

            onClick: () => setDeliveryDate("jan 15"),

            label: "Jan 15",

            active: method.date === "jan 15"

        },

        {

            onClick: () => setDeliveryDate("jan 16"),

            label: "Jan 16",

            active: method.date === "jan 16"

        },

        {

            onClick: () => setDeliveryDate("jan 17"),

            label: "Jan 17",

            active: method.date === "jan 17"

        },

        {

            onClick: () => setDeliveryDate("jan 18"),

            label: "Jan 18",

            active: method.date === "jan 18"

        },

        {

            onClick: () => setDeliveryDate("jan 19"),

            label: "Jan 19",

            active: method.date === "jan 19"

        }

    ];

    const deliveryTimes = [

        {

            onClick: () => setDeliveryTime("12 : 00 pm"),

            label: "12 : 00 pm",

            active: method.time === "12 : 00 pm"

        },

        {

            onClick: () => setDeliveryTime("02 : 00 pm"),

            label: "02 : 00 pm",

            active: method.time === "02 : 00 pm"

        },

        {

            onClick: () => setDeliveryTime("04 : 00 pm"),

            label: "04 : 00 pm",

            active: method.time === "04 : 00 pm"

        },

        {

            onClick: () => setDeliveryTime("06 : 00 pm"),

            label: "06 : 00 pm",

            active: method.time === "06 : 00 pm"

        },

    ];

    useEffect(() => {

        if (trigger > 0) {

            setVisibility(true);

        }

        if ( trigger === -12 ) setVisibility(false);

    }, [trigger]);

    return (

        <>

            <Modal

                visibility={visibility}

                toggleOut={() => toggleOut()}

                legendClass={"modal-legend-bold"}

                class={`modal-default-alignment`}

                holderClass={"settings-modal-holder"}

                title={"Delivery Method"}

            >

                <div className="checkout-delivery-method">

                    <div className="checkout-delivery-method-selectors">

                        <ViewFormatter

                            svgLeftIcon={CourierDeliveryIcon}

                            svgRightIcon={method.route === "courier" ? CheckMarkIcon : CheckMarkEmptyIcon}

                            title={"By courier"}

                            value={"Tomorrow, anytime"}

                            onClick={() => change("courier", "route", setMethod)}

                        />

                        <ViewFormatter

                            svgLeftIcon={SelfDeliveryIcon}

                            svgRightIcon={method.route === "delivery" ? CheckMarkIcon : CheckMarkEmptyIcon}

                            title={"I'll take it myself"}

                            value={"Any day from tomorrow"}

                            onClick={() => change("delivery", "route", setMethod)}

                        />

                    </div>

                    <div className="checkout-delivery-method-address">

                        <h2> Delivery Address </h2>

                        <ViewFormatter

                            svgLeftIcon={LocationIcon}

                            title={method.route === "courier" ? "Julius Close, Off Mc'Intyre Street" : "12, Ascension Descent, Park View Street"}

                            value={method.route === "courier" ? "The Game Store, +2348889029222" : "James Dean, +234999110920"}

                        />

                    </div>

                    <div className="checkout-delivery-method-date">

                        <h2> Delivery Time </h2>

                        <ItemTypeToggle

                            items={deliveryDates}

                        />

                        <ItemTypeToggle

                            items={deliveryTimes}

                        />

                    </div>

                    <div className="checkout-contact-next">

                        <Button

                            label="Continue"

                            onClick={() => goToPaymentMethod()}

                        />

                    </div>

                </div>

            </Modal>

        </>


    )

}

interface Props {

    trigger: number,

    goToPaymentMethod: () => void

}
