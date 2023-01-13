import React, { useEffect, useState } from "react";
import { Button, FormField, Modal } from "components";

export const ContactAddress: React.FC<Props> = ({

    trigger,

    goToDeliveryScreen,

}) => {

    const [visibility, setVisibility] = useState(false);

    const toggleOut = () => setVisibility(false);

    useEffect(() => {

        if (trigger > 0) {

            setVisibility(true);

        }

    }, [trigger]);

    return (

        <>

            <Modal

                visibility={visibility}

                toggleOut={() => toggleOut()}

                legendClass={"modal-legend-bold"}

                class={`modal-default-alignment`}

                holderClass={"settings-modal-holder"}

                title={"Contact Information"}

            >

                <div className="checkout-contact">

                    <FormField label="Full name" placeHolder={"James Dean"} />

                    <FormField label="Phone" placeHolder={"+234999110920"} />

                    <FormField label="Email" placeHolder={"james@dean.com"} />

                    <FormField label="Address" type="text-area" placeHolder={"12, Ascension Descent, Park View, Lagos"} />

                    <div className="checkout-contact-next">

                        <Button

                            label="Continue"

                            onClick={() => goToDeliveryScreen()}

                        />

                    </div>

                </div>

            </Modal>

        </>


    )

}

interface Props {

    trigger: number,

    goToDeliveryScreen: () => void

}
