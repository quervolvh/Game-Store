import React, { useEffect, useState } from "react";
import { cartFunctionType, cartType, productBlock } from "types";
import { ContactAddress } from "./ContactAddress";
import { DeliveryMethod } from "./DeliveryMethod";
import { change } from "utils";
import { PaymentMethod } from "./PaymentMethod";
import { Success } from "./Success";

export const CheckOut: React.FC<Props> = ({

    trigger,

    toggleOut

}) => {

    const [viewTriggers, setViewTriggers] = useState({

        address: 0,

        deliveryMethod: 0,

        paymentMethod: 0,

        success: 0

    });

    const closeAllViews = () => setViewTriggers({

        address: -12,

        deliveryMethod: -12,

        paymentMethod: -12,

        success: -12

    });

    useEffect(() => {

        if (trigger > 0) {

            setViewTriggers((prevState) => ({ ...prevState, address: prevState.address + 1 }));

        }

    }, [trigger]);

    return (

        <>

            <ContactAddress

                trigger={viewTriggers.address}

                goToDeliveryScreen={() => change(viewTriggers.deliveryMethod + 1, "deliveryMethod", setViewTriggers)}

            />

            <DeliveryMethod

                trigger={viewTriggers.deliveryMethod}

                goToPaymentMethod={() => change(viewTriggers.paymentMethod + 1, "paymentMethod", setViewTriggers)}

            />

            <PaymentMethod

                trigger={viewTriggers.paymentMethod}

                goToPaymentSuccess={() => change(viewTriggers.success + 1, "success", setViewTriggers)}


            />

            <Success

                trigger={viewTriggers.success}

                toggleOut={() => {
                    
                    toggleOut();

                    closeAllViews();
                
                }}

            />

        </>


    )

}

interface Props {

    trigger: number,

    products: productBlock,

    cart: cartType,

    cartFunctions: cartFunctionType,

    toggleOut: () => void

}
