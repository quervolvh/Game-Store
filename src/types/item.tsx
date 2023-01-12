export type itemBlock = {

   giftCardsRLD?: {

      content: {

         img: string,
         name: string,
         productId: string,
         productName: string,
         fixedRecipientDenominations: number[]

      }[]

   },

   benefitsList?: {

      img: string,
      name: string,

   }[],

   ecommerce?: {

      thumbnail: string,
      productId: string,
      price: number,

   }[]

}
