import React, { useState } from "react";
import { MainLayout } from "layout/MainLayout";
import { useFetching } from "hooks/useFetching";
import { customerType } from "types";

export const Customers: React.FC<Props> = ({ isMobile, deviceWidth }) => {

  const [state, setState] = useState<{

    loading: boolean,

    data: customerType[],

    error: boolean

  }>({

    loading: true,

    data: [],

    error: false

  });

  useFetching({

    dispatcher: () => (

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, { method: "GET" })

        .then(item => item?.json())

        .catch(() => setState((prevState) => ({

          ...prevState,

          error: true

        }))

        )
    ),

    setter: (e) => setState((prevState) => ({ ...prevState, loading: false, data: e })),

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

       

      </>

    </MainLayout >

  );

}

export default Customers;

interface Props {

  isMobile: boolean,

  deviceWidth: number

}
