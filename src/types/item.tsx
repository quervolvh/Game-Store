export type productBlock = {

   giftCards?: {

         img: string,
         name: string,
         productId: string,
         productName: string,
         fixedRecipientDenominations: number[]

      }[],

   benefits?: {

      img: string,
      name: string,
      productId: string

   }[],

   eCommerce?: {

      thumbnail: string,
      productId: string,
      price: number,

   }[]

}
