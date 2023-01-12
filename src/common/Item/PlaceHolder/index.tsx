import React from 'react';

export const PlaceHolder = () => {

    return (
        <div className="item-placeholder">

            <div className='item-placeholder-image'/>

            <div className="item-placeholder-content">

                <div className='item-placeholder-content-title'/>

                <div className='item-placeholder-content-subtitle'/>

                <div className='item-placeholder-content-add'/>

            </div>

        </div>
    );
}

export const ItemsPlaceHolder: React.FC<{ length?: number }> = ({ length }) => {

    return (
        <div className="strickFadeIn items-placeholder-block">

            {[...Array(length || 32)].map((...args) =>

                <PlaceHolder key={`placeholder-item-${args[1]}`} />
            
            )}

        </div>
    )
}
