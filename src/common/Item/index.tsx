import { AddToCart, RemoveFromCartIcon } from "components";
import React, { useState } from "react";
import { cartFunctionType, cartType } from "types";
import { numberFormat } from "utils";
import { ItemView } from "./ItemView";

export const Item: React.FC<Props> = ({ item, cartFunctions, cart, extraInfo , triggerCart }) => {

    const [trigger, setTrigger] = useState(0);

    const price = item.fixedRecipientDenominations;

    const itemOnCart = cart.find(product =>

        product.productId !== undefined ? product.productId === (item?.productId || item?.id) :

            (product.focus === extraInfo.focus && product.index === extraInfo.index)

    );

    return (

        <>

            <ItemView

                item={item}

                trigger={trigger}

                cartFunctions={cartFunctions}

                itemOnCart={itemOnCart}

                extraInfo={extraInfo}

                triggerCart={()=> triggerCart()}

            />

            <div

                className="item"

                onClick={() => setTrigger((prevState) => (prevState + 1))}

                role={"button"}

                tabIndex={0}

            >

                <div className="item-image">

                    <img src={item?.img || item?.thumbnail} alt={item.productName || item?.name} />

                </div>

                <p className="item-title"> {item.productName || item?.name} </p>

                <p className="item-type"> Gift Card </p>

                <p className="item-price">

                    {price && (price?.length > 1 ? `${numberFormat(price[0])} - ${numberFormat(price[1])}` : numberFormat(price[0] || 0.0))}

                </p>

                <div

                    className="item-add-to-cart"

                    onClick={(e) => {

                        e.preventDefault();

                        e.stopPropagation();

                        cartFunctions?.[itemOnCart ? "removeItemFromCart" : "addToCart"]?.({

                            ...extraInfo,

                            productId: item.productId || item.id,

                        });

                    }}

                >

                    <span dangerouslySetInnerHTML={{ __html: itemOnCart ? RemoveFromCartIcon : AddToCart }} />

                    <p> {itemOnCart ? "Remove Item" : "Add To Cart"} </p>

                </div>

            </div>

        </>

    )

}

interface Props {

    item: { [key: string]: any },

    cartFunctions: cartFunctionType,

    cart: cartType,

    extraInfo: { focus: "benefits" | "giftCards" | "eCommerce", index: number },

    triggerCart: ()=> void

}
