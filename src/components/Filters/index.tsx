import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { Button, FormField } from "components";
import { FiltersIcon } from "components";
import { change, classnames, primitiveObj } from "utils";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { generateOptionConsiderations } from "utils";
import { useGetParamsOnLoad } from "hooks/useGetParamsOnLoad";

export const Filters: React.FC<Props> = ({ filterOptions, className, onReset }) => {

    const { options, classNames, safeParams, onSubmit } = filterOptions || {};

    const initialSelection = ({
        ...generateOptionConsiderations(
            true,
            (options || []).map(item => ({ value: item.value })),
            "value"
        ),
        startDate: null,
        endDate: null
    });

    const [state, setState] = useState<{
        selection: { [key: string]: boolean | string | undefined | null | { [key: string]: boolean | string | undefined | null } },
        showOptions: boolean,
        outsideEscape: boolean,
        loadQueries: {
            items: primitiveObj,
            animation: boolean
        },
    }>({

        selection: initialSelection,

        showOptions: false,

        outsideEscape: true,

        loadQueries: { items: {}, animation: false }

    });

    const createChange = (

        val: string | boolean | { [key: string]: string | boolean | number },

        key: "outsideEscape" | "showOptions" | "selection",

    ) => {

        const objValue = typeof val !== "string" && typeof val !== "boolean" && typeof val !== "number";

        if (key === "selection" && objValue) {

            change({ ...state.selection, ...val }, "selection", setState);

            return;

        }

        change(val, key, setState);

    }

    const composeSubmission = () => {

        const currentSelection = state.selection;

        type valType = string | null | undefined | boolean;

        let newSubmission: { [key: string]: valType | { [key: string]: valType } } = {};

        options?.forEach(item => {

            const key = item.value;

            if (!item?.multiSelect) {

                const current = currentSelection?.[key] as never as { label: string, value: string };

                // if current is a string, then this value was probably a param object that represented the current

                // filters that existed on page load

                newSubmission[key] = typeof current === "string" ? current : current?.value;

            }

        });

        newSubmission.startDate = currentSelection?.startDate;

        newSubmission.endDate = currentSelection?.endDate;

        return { ...currentSelection, ...newSubmission };

    }

    const ref = useRef() as LegacyRef<HTMLDivElement> | undefined;

    useGetParamsOnLoad({

        safeParams: (safeParams || [])?.filter(item => item !== "searchString"),

        setter: (items) => {

            if (Object.keys(items).length > 0) {

                setState((prevState) => ({
                    ...prevState,
                    loadQueries: { items, animation: true },
                    // Add the loadParams to the state-selection
                    selection: { ...prevState.selection, ...(items || {}) }
                }));

                return;

            }

        }

    });

    useEffect(() => {

        if (state.loadQueries.animation) {

            setTimeout(() => {

                setState((prevState) => ({
                    ...prevState,
                    loadQueries: { ...prevState.loadQueries, animation: false },
                }));


            }, 15000);

        }

        // eslint-disable-next-line
    }, [state.loadQueries.animation]);

    useOnClickOutside(ref, () => !state.outsideEscape ? null : change(false, "showOptions", setState));

    return (
        <div
            className={classnames("form-field filter-box", classNames)}
            ref={ref}
        >

            <span dangerouslySetInnerHTML={{ __html : FiltersIcon }}

                color={state?.loadQueries?.animation ? "color-white" : ""}

                className={classnames("ml-4 filter-box-button", state.loadQueries.animation && "glowing")}

                onClick={() => createChange(!state.showOptions, "showOptions")}

            />



            <div
                className={classnames(
                    "select-pop filter-box-selector fadeIn",
                    className,
                    state.showOptions && "visible"
                )}
            >

                <ul>

                    {options?.map((item, index) =>

                        <li key={`filter-option-${item.value}-${index}`}>

                            <FormField

                                type={item?.type}

                                options={!item?.options ? [item] : item.options}

                                onChange={(e) => createChange(!item?.options ? e : { [item?.value as string]: e }, "selection")}

                                label={item.label}

                                multiSelect={item?.multiSelect}

                                withSubmission={true}

                                className="filter-box-options"

                                defaultValue={state.loadQueries?.items?.[item?.value]}

                                value={state?.selection?.[item?.value] as any}

                            />

                        </li>

                    )}

                </ul>

                <div className="filter-box-select-buttons">

                    <Button
                        label="Refresh"
                        className="no-bg no-border mr-2"
                        onClick={() => {

                            onSubmit && onSubmit(initialSelection);

                            onReset();

                        }}

                    />

                    <Button label="Done" onClick={() => {
                        
                        onSubmit && onSubmit(composeSubmission())

                        setState((prevState)=> ({ ...prevState , showOptions : false }))
                        
                    }} />

                </div>

            </div>

        </div>
    );

}

type optionType = {

    label: string,

    value: string,

    multiSelect?: boolean,

    type?: "date" | "plain" | "option",

    options?: {

        label: string,

        value?: string | boolean | null,

    }[]

}[];

interface Props {

    className?: string | null,

    onReset: () => void,

    filterOptions?: {

        label?: string,

        options?: optionType,

        safeParams?: string[],

        classNames?: string,

        noFilterIcon?: boolean,

        preSelectedOption?: string,

        onSubmit?: (e: { [key: string]: string | boolean | undefined | null | { [key: string]: boolean | string | undefined | null } }) => void
    }

}
