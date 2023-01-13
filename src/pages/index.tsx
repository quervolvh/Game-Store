import React, { useState } from "react";
import { MainLayout } from "layout/MainLayout";
import { useFetching } from "hooks/useFetching";
import { cartFunctionType, productBlock } from "types";
import { Banner } from "common/Banner";
import { ViewToggle } from "common/ViewToggle";
import { ItemsPlaceHolder } from "common/Item/PlaceHolder";
import { Item } from "common/Item";
import { Pagination } from "components";

export const Customers: React.FC<Props> = ({

  isMobile,

  deviceWidth,

  cartFunctions,

  cart,

  triggerCart,

  setProducts

}) => {

  const [state, setState] = useState<{

    loading: boolean,

    products: productBlock,

    page: number,

    perPage: number,

    error: boolean,

    focus: "giftCards" | "eCommerce" | "benefits" 

  }>({

    loading: true,

    products: {},

    error: false,

    page: 1,

    perPage: 20,

    focus: "giftCards"

  });

  const focusMatcher = (focus: string) => {

    switch (focus) {

      case "giftCards":

        return state?.products?.giftCards || [];

      case "eCommerce":

        return state?.products?.eCommerce || [];

      default:

        return state?.products?.benefits || [];

    }

  }

  useFetching({

    dispatcher: () => (

      fetch(`https://api.chimoney.io/v0.2/info/assets?countryCode=NG&perPage=10`,

        {
          method: "GET",

          headers: {

            'X-API-KEY': '5fa47041cf1bca32b11f72a3bac177bcbec210479c06821401b5e3501ca7e262'

          }

        }

      ).then(item => item?.json())

        .catch(() => setState((prevState) => ({

          ...prevState,

          error: true

        }))

        )
    ),

    setter: (e: any ) => {

      const productBlock = {
        
        giftCards : e?.data?.giftCardsRLD?.content,

        eCommerce : e?.data?.ecommerce,

        benefits : e?.data?.benefitsList

      };

      setProducts(productBlock);

      setState((prevState) => ({ ...prevState, loading: false, products: productBlock }));

    },

    safeParams: []

  });

  return (

    <MainLayout
      title='Game Store'
      isMobile={isMobile}
      deviceWidth={deviceWidth}
      active={""}
      cart={cart}
      triggerCart={() => triggerCart()}

    >

      <>

        <Banner />

        <ViewToggle

          selected={state.focus}

          onSelect={(e: "eCommerce" | "giftCards" | "benefits") =>

            setState((prevState) => ({ ...prevState, "focus": e })

            )}

        />

        <div className="strickFadeIn items-placeholder-block">

          {focusMatcher(state.focus)?.filter((_, index: number) => {

            const itemsToDisplayStart = (state.page - 1) * state.perPage;

            const lowerLimit = itemsToDisplayStart;

            const upperLimit = (state.page) * state.perPage;

            if (index >= lowerLimit && index < upperLimit) {

              return true;

            }

            return false;

          })?.map((item, index) =>

            <Item

              item={item}

              cart={cart}

              extraInfo={{ index , focus: state.focus }}

              cartFunctions={cartFunctions}

              key={`cart-item-${item.productId}-${index} `}

            />

          )}

        </div>

        {state.loading && <ItemsPlaceHolder />}

        <Pagination

          isMobile={isMobile}

          pages={(focusMatcher(state.focus)?.length || 0) / state.perPage}

          page={state.page}

          perPageSelector={true}

          dataCount={focusMatcher(state.focus)?.length || 0}

          onClick={(pageAndPerPage) =>

            setState((prevState) => ({

              ...prevState,

              page: pageAndPerPage.page,

              perPage: pageAndPerPage.perPage,

            }))

          }

          empty={focusMatcher(state.focus)?.length === 0}

          perPage={20}


        />

      </>

    </MainLayout >

  );

}

export default Customers;

interface Props {

  isMobile: boolean,

  deviceWidth: number,

  cartFunctions: cartFunctionType,

  triggerCart: () => void,

  cart: { productId: string, count: number }[],

  setProducts: (e : productBlock ) => void

}
