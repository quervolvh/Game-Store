import { Pin } from "components";
import React from "react";
import { cartFunctionType, cartType, productBlock } from "types";
import { numberFormat } from "utils";
import { getUsablePrice } from "utils/product";
import { CartItem } from "./CartItem";

export const CartBox: React.FC<Props> = ({

    cart,

    cartFunctions,

    products

}) => {

    const total = () => {

        let accumulator = 0;

        cart.forEach((item) => {

            const product = products?.[item.focus]?.[item.index];

            accumulator = (accumulator || 0) + (item.count * getUsablePrice(product as any)) as number;

        })

        return accumulator;

    };

    return (

        <div className="cart">

            {cart.map((item) => {

                const product = products?.[item.focus]?.[item.index];

                return (

                    <CartItem

                        key={`cart-item-${item.productId || ""}-${item.focus}-${item.index}`}

                        cartFunctions={cartFunctions}

                        product={product as any}

                        item={item}

                    />
                )
            })}

            {cart.length > 0 &&

                <>

                    <div className="cart-promo">

                        <h1> promocode </h1>

                        <div className="cart-promo-box">

                            <h2> GAMESTORE </h2>

                            <span dangerouslySetInnerHTML={{ __html: Pin }} />

                        </div>



                    </div>

                    <div className="cart-totals">

                        <h1> Total Price ( NGN ) : </h1>

                        <h1> {numberFormat(total() || 0)} </h1>

                    </div>

                </>

            }

        </div>


    )

}

interface Props {

    toggleOut(): void,

    cartFunctions: cartFunctionType,

    cart: cartType,

    products: productBlock,

    checkOutTrigger: number

}
