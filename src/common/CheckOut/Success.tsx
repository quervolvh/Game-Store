import React, { useEffect, useState } from "react";
import { Button, Modal, successIcon } from "components";

export const Success: React.FC<Props> = ({

    trigger,

    toggleOut

}) => {

    const [visibility, setVisibility] = useState(false);

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

                title={"Payment Processed !"}

            >

                <div className="checkout-success">

                    <span className="checkout-success-icon" dangerouslySetInnerHTML={{ __html : successIcon }} />

                    <h2> Your order is placed </h2>

                    <p> thanks for your order, we hope you enjoyed shopping with us </p>

                  
                    <div className="checkout-contact-next">

                        <Button

                            label="Done"

                            className="no-bg"

                            onClick={() => toggleOut()}

                        />

                    </div>

                </div>

            </Modal>

        </>


    )

}

interface Props {

    trigger: number,

    toggleOut: () => void

}
