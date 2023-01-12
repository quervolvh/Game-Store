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
              onClick: ()=> onSelect("gift-cards"),
              active: selected === "gift-cards"

            },
            
            {

              label: "Benefit List",
              onClick: ()=> onSelect("benefit"),
              active: selected === "benefit"

            },

            {

                label: "E-commerce",
                onClick: ()=> onSelect("e-commerce"),
                active: selected === "e-commerce"
  
              }

        ]}  
        
        />

      </div>

  );

}

interface Props {

    onSelect: (e: "e-commerce" | "gift-cards" | "benefit")=> void,

    selected: string

}
