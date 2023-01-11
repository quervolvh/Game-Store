import { useState, useEffect } from 'react';
import 'assets/styles/main.scss';
import { change, resizer } from 'utils';
import type { AppProps } from 'next/app';
import { SetClientAvailability } from 'hooks/useIsClient';

export default function App({ Component, pageProps }: AppProps) {

  const [state, setState] = useState({
    isMobile: false,
    deviceWidth: 0,
    showMobileView: false,
    timeOutTrigger: 0,
    clientMode: false
  });

  const { isMobile, deviceWidth, showMobileView, clientMode } = state;

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

    <Component

      isMobile={showMobileView}

      deviceWidth={deviceWidth}

      clientMode={clientMode}

      {...pageProps}

    />

  )

}
