import React from 'react';
import { MainLayoutFullHeader } from './MainLayoutFullHeader';
import { MainLayoutMobileHeader } from './MainLayoutMobileHeader';

export const MainLayoutHeader: React.FC<Props> = ({ isMobile, deviceWidth, active, title , cart }): JSX.Element => {

    return (
        <>
            {(isMobile || (deviceWidth < 1101)) ?

                <MainLayoutMobileHeader
                    active={active}
                />

                :

                <MainLayoutFullHeader
                    title={title}
                    cart={cart}
                />

            }
        </>
    )
}

interface Props {
    isMobile: boolean,
    deviceWidth: number,
    active: string,
    title?: string,
    cart: { productId: string , count: number }[]
}
