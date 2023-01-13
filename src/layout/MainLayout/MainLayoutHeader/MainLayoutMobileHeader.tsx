import React, { useState, useRef } from 'react';
import { MobileHeaderToggler } from 'components';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { SideNavContent } from './NavControls/SideNavContent';

export const MainLayoutMobileHeader: React.FC<Props> = ({ active, cart, triggerCart }): JSX.Element => {

    const ref: React.MutableRefObject<any> = useRef();

    const [isExpanded, setIsExpanded] = useState(false);

    useOnClickOutside(ref, () => isExpanded ? setIsExpanded(false) : null);

    return (
        <div className="LandingLayout-header-mobile main-layout-header-mobile main-layout-header-main" ref={ref} >

            <MobileHeaderToggler setExpansion={setIsExpanded} isExpanded={isExpanded} cart={cart} triggerCart={triggerCart} />

            <div className={`LandingLayout-header-mobile-exp ${isExpanded ? "expanded" : ""}`}>

                <MobileHeaderToggler setExpansion={setIsExpanded} isExpanded={isExpanded}  cart={cart} triggerCart={triggerCart} />

                <div className="main-layout-header-mobile-links">

                    <SideNavContent active={active} />

                </div>

            </div>

        </div>

    );
}

interface Props {
    active: string,
    avatar?: string,
    triggerCart: () => void,
    cart: { productId: string, count: number }[]
}
