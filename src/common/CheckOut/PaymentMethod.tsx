import React, { useEffect, useState } from "react";
import {
    ApplePay,
    Button, CheckMarkEmptyIcon, CheckMarkIcon, MasterCardIcon, Modal,
    ViewFormatter,
    VisaIcon
} from "components";

export const PaymentMethod: React.FC<Props> = ({

    trigger,

    goToPaymentSuccess

}) => {

    const [visibility, setVisibility] = useState(false);

    const [method, setMethod] = useState("mastercard");

    const toggleOut = () => setVisibility(false);

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

                title={"Payment Method"}

            >

                <div className="checkout-delivery-method">

                    <div className="checkout-delivery-method-selectors">

                        <ViewFormatter

                            svgLeftIcon={MasterCardIcon}

                            svgRightIcon={method === "mastercard" ? CheckMarkIcon : CheckMarkEmptyIcon}

                            title={"Mastercard 9833"}

                            value={"734, Exp: 12/29"}

                            onClick={() => setMethod("mastercard")}

                        />

                        <ViewFormatter

                            svgLeftIcon={VisaIcon}

                            svgRightIcon={method === "visa" ? CheckMarkIcon : CheckMarkEmptyIcon}

                            title={"Visa 7233"}

                            value={"321, Exp: 11/29"}

                            onClick={() => setMethod("visa")}

                        />

                        <ViewFormatter

                            svgLeftIcon={ApplePay}

                            svgRightIcon={method === "apple" ? CheckMarkIcon : CheckMarkEmptyIcon}

                            title={"Apple pay"}

                            value={"321, Exp: 11/29"}

                            onClick={() => setMethod("apple")}

                        />

                    </div>

                    <div className="checkout-contact-next">

                        <Button

                            label="Continue"

                            onClick={() => goToPaymentSuccess()}

                        />

                    </div>

                </div>

            </Modal>

        </>


    )

}

interface Props {

    trigger: number,

    goToPaymentSuccess: () => void

}
