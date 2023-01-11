import React, { useState } from "react";
import { MainLayout } from "layout/MainLayout";
import { useFetching } from "hooks/useFetching";
import { customerType } from "types";
import { Banner } from "common/Banner";
import { ItemTypeToggle } from "components";

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

        <Banner />

        <h1> Product </h1>

        <ItemTypeToggle 
        
        items={[

            {

              label: "Top",
              onClick: ()=> null,
              active: true

            },

            {

              label: "Popular",
              onClick: ()=> null,

            },
            
            {

              label: "Recommended",
              onClick: ()=> null,

            }

        ]}  
        
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
