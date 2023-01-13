import { useState, useEffect } from 'react';
import 'assets/styles/main.scss';
import { change, resizer } from 'utils';
import type { AppProps } from 'next/app';
import { SetClientAvailability } from 'hooks/useIsClient';
import { productBlock } from 'types';
import { Cart } from 'common/Cart';

export default function App({ Component, pageProps }: AppProps) {

  const [state, setState] = useState<{

    isMobile: boolean,
    deviceWidth: number,
    showMobileView: boolean,
    timeOutTrigger: number,
    clientMode: boolean,
    cart: { productId: string, count: number, index: number, focus: string }[],
    products: productBlock,
    cartTrigger: number

  }>({
    isMobile: false,
    deviceWidth: 0,
    showMobileView: false,
    timeOutTrigger: 0,
    clientMode: false,
    cart: [],
    products: {},
    cartTrigger: 0
  });

  const { isMobile, deviceWidth, showMobileView, clientMode, cartTrigger, cart, products } = state;

  const setCart = (newCart: { productId: string, count: number, index: number, focus: string }[]) =>

    setState((prevState) => ({ ...prevState, cart: newCart }));

  const cartFunctions = {

    addToCart: (e: { productId: string, focus: "eCommerce" | "giftCards" | "benefits", index: number }) => {

      setCart([...state.cart, { productId: e.productId, count: 1, index: e.index, focus: e.focus }])

    },

    removeItemFromCart: ( e : { productId: string }) => setCart([...state.cart].filter(item => item.productId !== e.productId)),

    modifyCartItem: (productId: string, action: "increment" | "decrement") => {

      const items = [...state.cart].map(item => (item.productId === productId) ?

        { ...item, count: item.count + (action === "increment" ? 1 : -1) }

        : item

      );

      setCart(items);

    }

  };

  const resizeListener = (mode: "add" | "remove") => {

    window?.[mode === "add" ? "addEventListener" : "removeEventListener"]?.("resize",

      () => resizer(

        (e) => change(e, "isMobile", setState),

        (e) => change(e, "deviceWidth", setState)

      ),

      false

    );

  }

  useEffect(() => {

    // On first load, this function sets the values obtained for client width and height.

    if (clientMode && window && document) {

      resizeListener("add");

      change(document?.body?.clientWidth < 601, "isMobile", setState);

      change(document?.body?.clientWidth, "deviceWidth", setState);

    }

    return (() => {

      if (clientMode && window) { resizeListener("remove"); }

    })

    //eslint-disable-next-line
  }, [clientMode]);

  useEffect(() => {

    change(isMobile, "showMobileView", setState);

  }, [isMobile]);

  useEffect(() => {

    // On first load, this function sets the values obtained for client width and height.

    if (clientMode && window && document) {

      resizeListener("add");

      change(document?.body?.clientWidth < 601, "isMobile", setState);

      change(document?.body?.clientWidth, "deviceWidth", setState);

    }

    return (() => {

      if (clientMode && window) { resizeListener("remove"); }

    })

    //eslint-disable-next-line
  }, [clientMode]);

  SetClientAvailability((e) => change(e, "clientMode", setState));

  return (

    <>

      <Cart

        trigger={cartTrigger}

        products={products}

        cartFunctions={cartFunctions}

        cart={cart}

      />

      <Component

        isMobile={showMobileView}

        deviceWidth={deviceWidth}

        clientMode={clientMode}

        cartFunctions={cartFunctions}

        cart={cart}

        setProducts={(block: productBlock) => setState((prevState) => ({ ...prevState, products: block }))}

        triggerCart={() => setState((prevState) => ({ ...prevState, cartTrigger: prevState.cartTrigger + 1 }))}

        {...pageProps}

      />

    </>

  )

}
