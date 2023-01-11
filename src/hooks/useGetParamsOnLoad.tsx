import { useEffect, useState } from 'react';
import { dependencyGenerator } from 'utils';
import { SetClientAvailability } from './useIsClient';

export const useGetParamsOnLoad = ({
    setter,
    safeParams,
    continuousCapture = false
}: Props) => {

    /* 
    
      This hook helps to retrieve params from the url string.
      It uses the safeParam hooks as a pointer and retrieved only values for keys provided in the safeParams array.
      
      i.e, for a url string like: http://{baseuRL}/link?action=GRIND&view=MAUL&status=TRUE
      and a safeParam array like safeParam : ["action"]
      will produce { action : "GRIND" }. All other url prams will be ignored.

      An optional continuousCapture prop is provided to determine if the changes in the url parameters are to be
      counted or ignored.

    */

    const [clientMode, setClientMode] = useState(false);

    const paramObj = clientMode ? window?.history?.state?.as : undefined;

    const rawPageQuery = paramObj ? Object.fromEntries(new URLSearchParams(String(paramObj).split("?")[1])) : undefined;

    const fetchingMechanism = async (

        setter?: (e: any) => void,

    ) => {

        const usableParams: { [key: string]: string | number } = {};

        Object.entries(rawPageQuery || {}).forEach(([key, value]) => {

            if ((safeParams || []).includes(key)) {

                if (key === "page") {

                    usableParams[key] = Number(rawPageQuery?.page ? rawPageQuery.page : 1);

                    return;

                }

                usableParams[key] = value;

            }

        });


        if (setter) setter(usableParams);

        // eslint-disable-next-line
    };


    useEffect(() => {

        if (rawPageQuery !== undefined) {

            fetchingMechanism(setter);

        }

        // eslint-disable-next-line
    }, [...(!continuousCapture ? [] : dependencyGenerator(safeParams, rawPageQuery)), rawPageQuery === undefined]);

    SetClientAvailability((e) => setClientMode(e));

}

interface Props {
    setter?: (e: any) => void,
    safeParams?: string[],
    continuousCapture?: boolean
}
