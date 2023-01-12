import { AddToCart, Modal } from "components";
import React, { useState } from "react";
import { numberFormat } from "utils";

export const Item: React.FC<{ item?: { [key: string]: any } }> = ({ item }) => {

    const [visibility, setVisibility] = useState(false);

    const price = item.fixedRecipientDenominations;

    return (

        <>

            <Modal

                title={"Add to Cart"}

                visibility={visibility}

                legendClass={"modal-legend-bold"}

                class={`modal-default-alignment`}

                holderClass={"settings-modal-holder"}

                toggleOut={() => setVisibility(false)}

                subtitle={item.productName || item?.name}

            >

                <div className="item-modal-cart">

                    <img

                        src={item?.img || item?.thumbnail}

                        alt={item?.productName || item?.name}

                    />

                </div>

                <div className="cart-quantifier">

                    <div className="cart-quantifier-button"> + </div>

                    <div className="cart-quantifier-quantity"> Qty: 1 </div>

                    <div className="cart-quantifier-button"> - </div>

                </div>

            </Modal>

            <div

                className="item"

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
                    
                    onClick={() => setVisibility(true)}

                    >

                    <span dangerouslySetInnerHTML={{ __html: AddToCart }} />

                    <p > Add To Cart </p>

                </div>

            </div>

        </>

    )

}