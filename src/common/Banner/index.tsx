import React from "react";
import { images } from "constants/images";
import { Button, OrderNowIcon, Stars } from "components";

export const Banner: React.FC = ({}) => {

    return (

        <div className="banner">

            <div className="banner-labels">

                <span className="banner-stars" dangerouslySetInnerHTML={{ __html: Stars }} />

                <p className="banner-big-text"> [Oculus VR] Virtual Reality  </p>

                <p className="banner-small-text"> VR box 360 original complete geme.VR gaming complete set of 2 remotes. </p>

                <Button label="Order Now" vectorIcon={OrderNowIcon} />

            </div>

            <div className="banner-image">

                <img src={images.oculus} alt={"oculus-image"} width={506} height={336} />

            </div>

            <div className="banner-dots">

                <span />

                <span className="active" />

                <span />

            </div>

        </div>

    );

}
