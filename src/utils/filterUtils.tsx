import { NextRouter } from "next/router";

export const isObj = (val: any) => {

    if (!Array.isArray(val) && val && typeof val === "object") {

        return true;

    }

    return false;

}

export const filterProcess = (
    router: NextRouter,
    params: { [key: string]: string | boolean | undefined | number | null | { [key: string]: string | boolean | undefined | null | number } },
    excludeParams: boolean | string[] = false,
    strickParam: boolean = false,
) => {

    type filterParamTypes = { [key: string]: string | boolean };

    const currentFilters = (!router?.query || strickParam) ? {} : router?.query as filterParamTypes;

    let usableFilters: filterParamTypes = {};

    Object.entries({ ...currentFilters, ...params }).forEach(([key, value]) => {

        const exclusion = Array.isArray(excludeParams) ? excludeParams.includes(key) : false;

        if (exclusion) return;

        if (isObj(value)) {

            const objValue = value as never as { [key: string]: string | boolean | undefined };

            Object.entries(objValue).forEach(([key_, value_]) => {

                if ((value_ !== undefined && value !== null) && !exclusion) usableFilters[key_] = value_;

            })

        } else {

            value = value as string | boolean | undefined;

            if (["startDate", "endDate"].includes(key) && !value) return;

            if ((value !== undefined && value !== null) && !exclusion) usableFilters[key] = value;

        }

    });

    const paramString = new URLSearchParams(Object(usableFilters)).toString();

    const currentPage = router?.pathname;

    router?.push(`${currentPage}?${paramString}`);

}

export const dependencyGenerator = (

    safeParams: string[] | undefined,

    rawPageQuery: { [key: string]: string | undefined } | undefined

) => {

    let safeParamsObj: { [key: string]: undefined } = {};

    safeParams?.map(item => safeParamsObj[item] = undefined);

    let dependencies: any[] = [];

    Object.entries(safeParamsObj).forEach(([key,]) => {

        dependencies.push((rawPageQuery || {})[key]);

    })

    return dependencies;

}
