import React from 'react';
import Link from 'next/link';
import { images } from 'constants/index';

export const MobileHeaderToggler: React.FC<Props> = ({ setExpansion, isExpanded }): JSX.Element => {

    return (

        <div className="LandingLayout-header-mobile-top">

            <Link href={"/"}>

                <img src={images.lendsqr} alt={"stellas"} />

            </Link>

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
    isExpanded: boolean
}
