import React from 'react';
import { SideNavContent } from './MainLayoutHeader/NavControls/SideNavContent';

export const MainLayoutSideNav: React.FC<{ active?: string }> = ({ active }) => {

    return (
        <div className="main-layout-sideNav">

            <SideNavContent 
            
                active={active} 
                
            />

        </div>
    );
}
