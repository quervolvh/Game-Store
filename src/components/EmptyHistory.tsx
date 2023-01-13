import React from 'react';

export const EmptyHistory: React.FC<{ subtitle?: string}> = ({ subtitle }) => {

    return (

        <div className="empty-history">

            <h2> { subtitle || "Nothing to see here yet!" } </h2>

            <img src={"/svg/empty-transaction.svg"} alt={"Empty transaction"} />

        </div>
    )
}
