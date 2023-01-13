import React from "react";
import { ItemTypeToggle } from "components";

export const ViewToggle: React.FC<Props> = ({ onSelect , selected }) => {

  return (

      <div className="landing-header">

        <h1> Product </h1>

        <ItemTypeToggle 
        
        items={[

            {

              label: "Gift Cards",
              onClick: ()=> onSelect("giftCards"),
              active: selected === "giftCards"

            },
            
            {

              label: "Benefit List",
              onClick: ()=> onSelect("benefits"),
              active: selected === "benefits"

            },

            {

                label: "E-commerce",
                onClick: ()=> onSelect("eCommerce"),
                active: selected === "eCommerce"
  
              }

        ]}  
        
        />

      </div>

  );

}

interface Props {

    onSelect: (e: "eCommerce" | "giftCards" | "benefits")=> void,

    selected: string

}
