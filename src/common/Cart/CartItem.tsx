import { ModifyItem } from "common/Item/ModifyItem";
import React from "react";
import { cartFunctionType } from "types";
import { numberFormat } from "utils";
import { getUsablePrice } from "utils/product";

export const CartItem: React.FC<Props> = ({

    item,

    cartFunctions,

    product

}) => {

    return (

        <>


            <div className="cart-item" key={`cart-item-${item.productId || ""}-${item.focus}-${item.index}`}>

                <div className="cart-item-image">

                    <img src={product?.img} />

                </div>

                <div className="cart-item-body">

                    <p className="cart-item-name"> {product?.productName} </p>

                    <p className="cart-item-variant"> Variant : <span> Unavailable </span> </p>

                    <p className="cart-item-ref"> Product code : <span> {product?.productId || "no-ref"} </span> </p>

                    {/* <p> {item.count} </p> */}

                </div>

                <ModifyItem

                    item={product}

                    itemOnCart={item}

                    showButtons={false}

                    toggleOut={() => null}

                    cartFunctions={cartFunctions}

                />

                <p className="cart-item-price">

                    {numberFormat(getUsablePrice(product) * item.count)}

                </p>

            </div>



        </>


    )

}

interface Props {

    cartFunctions: cartFunctionType,

    product: {[key:string] : any},

    item: { count: number , index: number , productId: string }

}
