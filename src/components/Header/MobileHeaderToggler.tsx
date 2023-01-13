import React from 'react';
import Link from 'next/link';
import { CartIcon } from 'components/Assets';

export const MobileHeaderToggler: React.FC<Props> = ({ setExpansion, isExpanded, cart, triggerCart }): JSX.Element => {

    return (

        <div className="LandingLayout-header-mobile-top">

            <Link href={"/"}>

                <img src={"/logo/game.png"} alt={"Game store"} />

            </Link>


            <div className='main-layout-topBar-right-cart' onClick={() => triggerCart()}>

                <span

                    className='main-layout-topBar-right-notifications'

                    dangerouslySetInnerHTML={{ __html: CartIcon }}

                />

                {cart?.length > 0 &&

                    <div className='main-layout-topBar-right-cart-count'>

                        <p> {cart.length} </p>

                    </div>

                }

            </div>

            <i
                className={isExpanded ? "fas fa-times" : "fas fa-bars"}
                onClick={() => {
                    setExpansion(!isExpanded);
                }}
            />


        </div>

    );
}

interface Props {

    setExpansion(e: boolean): void,

    isExpanded: boolean,

    triggerCart: () => void,

    cart: { productId: string, count: number }[]
}
