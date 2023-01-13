import React from 'react';
import { CartIcon, LinkWrapper, NotificationsIcon } from 'components';
import { MainLayoutHeaderSearch } from './ManLayoutHeaderSearch';

export const MainLayoutFullHeader: React.FC<Props> = ({ cart , triggerCart }) => {

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

        <div className='main-layout-topBar-right-cart' onClick={()=> triggerCart()}>

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

      </div>


    </div>
  );

};


interface Props {
  avatar?: string,
  title?: string,
  triggerCart: ()=> void,
  cart: { productId: string, count: number }[]
}
