import React from 'react';

export const EmptyHistory: React.FC = ({ }) => {

    return (

        <div className="empty-history">

            <h2> {"Nothing to see here yet!"} </h2>

            <img src={"/svg/empty-transaction.svg"} alt={"Empty transaction"} />

        </div>
    )
}
