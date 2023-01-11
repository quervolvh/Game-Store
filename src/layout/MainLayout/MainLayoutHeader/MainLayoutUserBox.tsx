import React from 'react';
import Link from 'next/link';

export const MainLayoutUserBox: React.FC<Props> = ({ avatar }) => {

  return (

        <div className="main-layout-topBar-userBox">

          <Link

            href={"/profile"}

          >

            <img 
            
                className='main-layout-topBar-user-avatar' 
                
                src={( avatar || "/logo/game.png") as any} 
                
                alt={'user--'} 
                
            />

          </Link>

        </div>

  );

};


interface Props {
  avatar?: string,
}
