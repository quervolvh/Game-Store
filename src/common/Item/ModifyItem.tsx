import React from "react";
import { Button } from "components";
import { cartFunctionType } from "types";

export const ModifyItem: React.FC<Props> = ({ item, cartFunctions, itemOnCart, toggleOut, showButtons }) => {

    return (

        <>

            {itemOnCart &&

                <>

                    <div className="cart-quantifier">

                        <div

                            className="cart-quantifier-button"

                            onClick={() => {

                                if (itemOnCart.count === 1) {

                                    cartFunctions.removeItemFromCart(item.productId || item.id);

                                    return;

                                }

                                cartFunctions.modifyCartItem((item.productId || item.id), "decrement")

                            }}

                        > -

                        </div>

                        <div className="cart-quantifier-quantity"> Qty: {itemOnCart?.count} </div>

                        <div

                            className="cart-quantifier-button"

                            onClick={() => cartFunctions.modifyCartItem((item.productId || item.id), "increment")}

                        > + </div>

                    </div>

                    {showButtons !== false &&

                        <div className="item-modal-cart-buttons">

                            <Button label={"Go to Cart"} />

                            <div className="or">

                                <span />

                                <p> or </p>

                                <span />

                            </div>

                            <Button

                                label={"Continue Shopping"}

                                onClick={() => toggleOut()}

                            />

                        </div>

                    }

                </>

            }

        </>

    )

}

interface Props {

    item?: { [key: string]: any } | any,

    cartFunctions: cartFunctionType,

    itemOnCart?: { productId: string, count: number },

    toggleOut(): void,

    showButtons?: boolean

}
