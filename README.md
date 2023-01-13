# chimoney
Chimoney frontend assessment

Choice of React Framework used in this project is **Next.JS**.

Next.Js was chosen due to its completeness as a Framework. It has its own Router, performs SSR , uses file structure routing e.t.c

Features Implemented includes :

- Retrieval of data from Chimoney Api ( benefits , ecommerce and giftcards )
- Addition of items to the cart , cart page and complete checkout experience
- Click on product to add view its detail, add to cart , add quantity or remove
- Use of localstorage in retrieving cart item on reload

Routes:
- This is a single page applications, routes are either stamped onto modals or the default "/" route.

Design Approach:
- Approach used in implementing this was based on a rather minimalistic approach. 
- All extra pages ( i.e, product, checkout , cart ) are referred to as modal pages to keep app simple.

Limitations
- Due to lack of productId and prices on some of the data referenced Chimoney Test Api, cart functionality is a little limited.

Performance Improvement:
- Performance improvement would be to neccessitate the use of presisted data, i,e , by using redux store to save the data.
- Pagination has already been implemented here so, it won't be necessary.
- Addition of **productid** to benefits - list ( from backend / data-store ) to ensure each item is unique and can be referenced properly on the cart.

## To Get Started Locally

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
