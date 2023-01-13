import React, { useEffect, useState } from "react";
import { Button, FormField, Modal } from "components";
import { cartFunctionType, cartType, productBlock } from "types";
import { ContactAddress } from "./ContactAddress";
import { DeliveryMethod } from "./DeliveryMethod";
import { change } from "utils";

export const CheckOut: React.FC<Props> = ({

    trigger,

    products,

    cart,

    cartFunctions

}) => {

    const [viewTriggers, setViewTriggers] = useState({

        address: 0,

        deliveryMethod: 0

    });

    const toggleOut = () => setVisibility(false);

    useEffect(() => {

        if (trigger > 0) {

            setViewTriggers((prevState) => ({ ...prevState, address: prevState.address + 1 }));

        }

    }, [trigger]);

    return (

        <>

            <ContactAddress

                trigger={viewTriggers.address}

                products={products}

                cart={cart}

                cartFunctions={cartFunctions}

                goToDeliveryScreen={()=> change(viewTriggers.deliveryMethod + 1 , "deliveryMethod" , setViewTriggers )}

            />

            <DeliveryMethod

                trigger={viewTriggers.deliveryMethod}

            />

        </>


    )

}

interface Props {

    trigger: number,

    products: productBlock,

    cart: cartType,

    cartFunctions: cartFunctionType

}
