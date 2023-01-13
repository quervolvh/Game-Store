import React, { useEffect, useState } from "react";
import { Button, Modal } from "components";
import { cartFunctionType, cartType, productBlock } from "types";
import { CartBox } from "./CartBox";
import { CheckOut } from "common/CheckOut";

export const Cart: React.FC<Props> = ({

    trigger,

    products,

    cart,

    cartFunctions

}) => {

    const [visibility, setVisibility] = useState(false);

    const [checkOutTrigger, setCheckOutTrigger] = useState(0);

    const toggleOut = () => setVisibility(false);

    useEffect(() => {

        if (trigger > 0) {

            setVisibility(true);

        }

    }, [trigger]);


    return (

        <>

            <CheckOut

                trigger={checkOutTrigger}

                products={products}

                cartFunctions={cartFunctions}

                cart={cart}

            />

            <Modal

                visibility={visibility}

                toggleOut={() => toggleOut()}

                legendClass={"modal-legend-bold"}

                class={`large modal-default-alignment`}

                holderClass={"settings-modal-holder"}

                titleFlexComponent={cart?.length > 0 ?

                    <div className="cart-checkout-component-button">

                        <Button

                            onClick={() => setCheckOutTrigger((prevState) => prevState + 1)}

                            label="Check Out"

                        />

                    </div>

                    : undefined

                }

                title={"Your Cart"}

            >

                <CartBox

                    products={products}

                    toggleOut={() => toggleOut()}

                    cart={cart}

                    cartFunctions={cartFunctions}

                    checkOutTrigger={checkOutTrigger}

                />

            </Modal>

        </>


    )

}

interface Props {

    trigger: number,

    products: productBlock,

    cart: cartType,

    cartFunctions: cartFunctionType

}
