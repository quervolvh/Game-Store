import React, { useState } from "react";
import { MainLayout } from "layout/MainLayout";
import { useFetching } from "hooks/useFetching";
import { itemBlock } from "types";
import { Banner } from "common/Banner";
import { ViewToggle } from "common/ViewToggle";
import { ItemsPlaceHolder } from "common/Item/PlaceHolder";
import { Item } from "common/Item";
import { Pagination } from "components";
import { change } from "utils";

export const Customers: React.FC<Props> = ({ isMobile, deviceWidth }) => {

  const [state, setState] = useState<{

    loading: boolean,

    data: itemBlock,

    page: number,

    perPage: number,

    error: boolean,

    focus: string

  }>({

    loading: true,

    data: {},

    error: false,

    page: 1,

    perPage: 20,

    focus: "gift-cards"

  });

  const focusMatcher = (focus: string) => {

    switch (focus) {

      case "gift-cards":

        return state?.data?.giftCardsRLD?.content || [];

      case "e-commerce":

        return state?.data?.ecommerce || [];

      default:

        return state?.data?.benefitsList || [];

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

    setter: (e) => setState((prevState) => ({ ...prevState, loading: false, data: e?.data })),

    safeParams: []

  });

  return (

    <MainLayout
      title='Game Store'
      isMobile={isMobile}
      deviceWidth={deviceWidth}
      active={""}
    >

      <>

        <Banner />

        <ViewToggle

          selected={state.focus}

          onSelect={(e: "e-commerce" | "gift-cards" | "benefit") =>

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

          }

          )?.map((item) => <Item item={item} />)}

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

  deviceWidth: number

}
