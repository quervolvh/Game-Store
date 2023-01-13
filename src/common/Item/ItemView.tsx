import React, { useEffect, useState } from "react";
import { Button, Modal } from "components";
import { cartFunctionType } from "types";
import { ModifyItem } from "./ModifyItem";
import { numberFormat } from "utils";

export const ItemView: React.FC<Props> = ({ item, trigger, cartFunctions, itemOnCart }) => {

    const [visibility, setVisibility] = useState(false);

    const price = item.fixedRecipientDenominations;

    const getUsablePrice = () => {

        if ( price &&  Array.isArray(price) ) {

            if ( Array.isArray(price) ) return price[0] || 0;


        }

       return 0;

    }

    const toggleOut = () => setVisibility(false);

    useEffect(() => {

        if (trigger > 0) {

            setVisibility(true);

        }

    }, [trigger]);

    return (

        <>

            <Modal

                subtitle={item?.type}

                visibility={visibility}

                legendClass={"modal-legend-bold"}

                class={`modal-default-alignment`}

                holderClass={"settings-modal-holder"}

                toggleOut={() => toggleOut()}

                title={item.productName || item?.name}

            >

                <div className="item-modal-cart">

                    <img

                        src={item?.img || item?.thumbnail}

                        alt={item?.productName || item?.name}

                    />

                    <p className="item-modal-cart-price"> Starts at : <span> {numberFormat(getUsablePrice())} </span> </p>

                    {itemOnCart &&

                        <ModifyItem

                            item={item}

                            cartFunctions={cartFunctions}

                            itemOnCart={itemOnCart}

                            toggleOut={()=> toggleOut()}

                        />

                    }

                    {!itemOnCart &&

                        <div className="item-modal-cart-add">

                            <Button 
                            
                                label="Add To Cart" 
                                
                                onClick={()=>  cartFunctions.addToCart(item.productId || item.id)}
                                
                            />

                        </div>

                    }

                </div>

            </Modal>

        </>

    )

}

interface Props {

    item?: { [key: string]: any },

    trigger: number,

    cartFunctions: cartFunctionType,

    itemOnCart?: { productId: string, count: number }

}
