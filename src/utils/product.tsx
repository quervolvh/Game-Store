export const getUsablePrice = ( item : any ) => {

    const price = item?.fixedRecipientDenominations;

    if ( price &&  Array.isArray(price) ) {

        if ( Array.isArray(price) ) return price[0] || 0;


    }

   return 0;

}
