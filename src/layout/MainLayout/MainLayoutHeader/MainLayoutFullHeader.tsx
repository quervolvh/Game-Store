import React from 'react';
import { CartIcon, LinkWrapper, NotificationsIcon } from 'components';
import { MainLayoutHeaderSearch } from './ManLayoutHeaderSearch';

export const MainLayoutFullHeader: React.FC<Props> = ({}) => {

  return (
    <div className="main-layout-full-header main-layout-topBar">

      <div className="main-layout-topBar-company">

        <div className="main-layout-topBar-company-box">

          <LinkWrapper link='/'>

            <img src={"/logo/game.png"} alt={"chimoney"} />

          </LinkWrapper>

        </div>

      </div>

      <div className='main-layout-topBar-right'>

        <MainLayoutHeaderSearch />

        <span

          className='main-layout-topBar-right-notifications'

          dangerouslySetInnerHTML={{ __html: NotificationsIcon }}

        />

        <span

          className='main-layout-topBar-right-notifications'

          dangerouslySetInnerHTML={{ __html: CartIcon }}

        />

      </div>


    </div>
  );

};


interface Props {
  avatar?: string,
  title?: string
}
