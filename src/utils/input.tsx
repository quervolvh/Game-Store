export const generateOptionConsiderations = (

    multiSelect: boolean,

    options: { [key: string]: string | boolean | null | undefined }[],

    field: string

) => {

    let allOptions: { [key: string]: boolean | null | string | undefined } = {};

    if (multiSelect && Array.isArray(options)) {

        (options || []).forEach((item) => {

            const itemType = typeof item;

            let key = itemType === "string" ? item : (item?.value || item?.[field || ""]);

            if (key && typeof key === "string") allOptions[key] = undefined;

        })

    }

    return allOptions;

}

export const mapObjectKeysToLabels = (obj: { [key: string]: { label: string, value: string } }) => {

    let keyToLabelObj: { [key: string]: string } = {};

    Object.entries(obj).forEach( ([, val]) =>

        keyToLabelObj[val.value] = val.label

    );

    return keyToLabelObj;

}
