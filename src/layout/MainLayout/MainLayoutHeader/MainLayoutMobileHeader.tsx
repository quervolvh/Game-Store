import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {  MobileHeaderToggler } from 'components';
import { useRouter } from 'next/router';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { SideNavContent } from './NavControls/SideNavContent';

export const MainLayoutMobileHeader: React.FC<Props> = ({ avatar , active }): JSX.Element => {

    const ref: React.MutableRefObject<any> = useRef();

    const [isExpanded, setIsExpanded] = useState(false);

    const router = useRouter();

    // const reset = () => {
    //     router.push("/");
    // };

    useOnClickOutside(ref, () => isExpanded ? setIsExpanded(false) : null);

    return (
        <div className="LandingLayout-header-mobile main-layout-header-mobile main-layout-header-main" ref={ref} >

            <MobileHeaderToggler setExpansion={setIsExpanded} isExpanded={isExpanded} />

            <div className={`LandingLayout-header-mobile-exp ${isExpanded ? "expanded" : ""}`}>

                <MobileHeaderToggler setExpansion={setIsExpanded} isExpanded={isExpanded} />

                <div
                    className="main-layout-header-mobile-userBox"
                    tabIndex={0}
                    role={"button"}
                    onKeyDown={(e) => e.key === "Enter" && router.push("/account")}>

                    <Link href={"/account"}>

                        <img src={avatar || "/png/user-avatar.png"} alt={'user--'} />

                    </Link>

                </div>

                <div className="main-layout-header-mobile-links">

                    <SideNavContent active={active} />

                </div>

            </div>

        </div>

    );
}

interface Props {
    active: string,
    avatar?: string
}
