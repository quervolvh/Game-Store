import React from 'react';
import { MainLayoutFullHeader } from './MainLayoutFullHeader';
import { MainLayoutMobileHeader } from './MainLayoutMobileHeader';

export const MainLayoutHeader: React.FC<Props> = ({ isMobile, deviceWidth, active, title }): JSX.Element => {

    return (
        <>
            {(isMobile || (deviceWidth < 1101)) ?

                <MainLayoutMobileHeader
                    active={active}
                />

                :

                <MainLayoutFullHeader
                    title={title}
                />

            }
        </>
    )
}

interface Props {
    isMobile: boolean,
    deviceWidth: number,
    active: string,
    title?: string
}
