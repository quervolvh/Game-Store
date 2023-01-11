import React, { useState, useRef, JSXElementConstructor } from 'react';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { FormField } from '../index';
import { ReactElement } from 'react';
import { classnames } from 'utils';
import { Button } from 'components/Button';
import { change as setChange } from 'utils';
import { OptionInputItem } from './OptionInputItem';
import { generateOptionConsiderations, mapObjectKeysToLabels } from 'utils';
import { objectOptionType } from 'types';
import { ContextMenuIcon } from 'components/Assets';

export const OptionsInput: React.FC<OptionsInputProp> = (
    {

        label, onChange, value, className, withSubmission, onSubmit,

        field, onClick = () => null, asButton, placeHolder, ...props

    }
) => {

    const defaultValue = props.defaultValue;

    const [state, setState] = useState({

        selection: generateOptionConsiderations(
            props.multiSelect || false,
            props.options as any,
            (field || "")
        ),

        searchValue: "",

        showOptions: false,

        outsideEscape: true,

        ignoreDefaultValue: false

    });

    const createChange = (
        val: string | boolean |
        { [key: string]: string | boolean | number },

        key: "outsideEscape" | "showOptions" | "searchValue" | "selection") => {

        const objValue = typeof val !== "string" && typeof val !== "boolean" && typeof val !== "number";

        if (key === "selection" && objValue) {

            setChange({ ...state.selection, ...val }, "selection", setState);

            onChange && onChange({ ...state.selection, ...val })

            return;

        }

        setChange(val, key, setState);

    }

    const { outsideEscape, showOptions, searchValue } = state;

    const ref: React.MutableRefObject<any> = useRef();

    const searchProcess = (item: string | any): boolean => {

        const { searchValue } = state;

        let itemLabel = item === "string" ? item : item?.[props.displayField || "label" || ""];

        itemLabel = itemLabel || "";

        return itemLabel.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());

    }

    const change = (val: string | number | any) => {

        if (typeof onChange !== "function") return;

        onChange(val);
    };

    const clickOption = (e: string | boolean | { [key: string]: string | boolean }) => {

        if (props.multiSelect) {

            createChange(e, "selection");

            if (withSubmission) return;

        }

        change(e);

        createChange(false, "showOptions");

    }

    const displayOutput = (placeholderStatus = false) => {

        let displayValue = { value: placeHolder || "choose", isDefault: true };

        if (defaultValue !== undefined && !state.ignoreDefaultValue) {

            return placeholderStatus ? false : String(defaultValue) === "null" ? "All" : String(defaultValue);

        }

        if (value === undefined || value === null) {

            return placeholderStatus ? displayValue.isDefault : displayValue.value;

        };

        const display = (_val: string | { [key: string]: any }) => {

            if (typeof _val === "string") {

                return _val;

            }

            return _val[props.displayField || "label"];
        }

        if (props.multiSelect) {

            const options = props.options as unknown as { [key: string]: { label: string, value: string } };

            const selectedLabels = mapObjectKeysToLabels(options);

            let allSelection: string[] = [];

            Object.entries(state.selection).forEach(([key, value]) =>

                (value === true && selectedLabels[key]) && allSelection.push(selectedLabels[key])

            )

            const selectionAvailability = allSelection.length > 0;

            displayValue = { value: selectionAvailability ? allSelection.join(" & ") : "choose", isDefault: !selectionAvailability };

        } else {

            displayValue = { value: display(value) || placeHolder, isDefault: !value };

        }

        return placeholderStatus ? displayValue["isDefault"] : displayValue["value"];

    }

    const Output = displayOutput();

    const placeHolderStatus = displayOutput(true);

    useOnClickOutside(ref, () => !outsideEscape ? null : createChange(false, "showOptions"));

    return (
        <div

            className={`form-field ${className}`}

            ref={ref}

        >

            {label && !props.isContextMenu &&
                <p

                    className="form-field-title context-menu-title"

                    tabIndex={props.isContextMenu ? 0 : 1}>

                    {label}

                </p>
            }

            <div
                className={classnames(

                    !asButton && 'select',

                    props.isContextMenu && 'withContextMenu',

                    props.selectorBoxClass

                )}

                tabIndex={0}

                role={"button"}
            >

                {
                    asButton &&

                    <Button

                        vectorIcon={asButton.svgIcon}

                        label={asButton.label}

                        className={asButton.classnames}

                        onClick={() => {

                            onClick();

                            createChange(!state.showOptions, "showOptions");

                            createChange(true, "outsideEscape");

                        }}
                    />

                }

                {!asButton &&

                    <div

                        tabIndex={0}

                        className={"select-box"}

                        onClick={() => {

                            onClick();

                            createChange(!state.showOptions, "showOptions");

                            createChange(true, "outsideEscape");

                        }}

                        onKeyDown={(e) => props.onKeyDown && props.onKeyDown(e)}

                    >

                        {
                            !props.isContextMenu ?


                                <>

                                    <div className={classnames('form-input', placeHolderStatus ? 'form-field-placeholder' : '')}>

                                        <span> {typeof Output === "function" ? <Output /> : Output} </span>

                                    </div>

                                    {props.noDropDownIcon !== true &&

                                        <i
                                            className="fa fa-chevron-down down-icon"
                                            aria-hidden="true"
                                        />

                                    }

                                </>

                                :

                                <div className="_menu-selector">

                                    {label &&

                                        <p
                                            className="form-field-title"
                                            tabIndex={0}>
                                            {label}
                                        </p>

                                    }


                                    <div className="select-box-context">

                                        <i dangerouslySetInnerHTML={{ __html : ContextMenuIcon }} />

                                    </div>

                                </div>
                        }


                    </div>

                }


                {
                    showOptions &&

                    <div className="select-pop fadeIn" id="pop-">

                        {props.isSearchable &&

                            <FormField

                                className="select-pop-search"

                                placeHolder="Search Item"

                                type="plain"

                                value={searchValue}

                                onChange={(e: string) => createChange(e, "searchValue")}

                            />

                        }

                        <ul>

                            {(props?.options || [])

                                // .filter((item: any )=> typeof item !== "function")

                                .filter((item) => props.isSearchable ? searchProcess(item) : true)

                                .map((item, index: number) =>

                                    <React.Fragment

                                        key={`option-${index}`} >

                                        <OptionInputItem

                                            click={(item: string | { [key: string]: boolean | string }) => {

                                                let clickableItem = item as { onClick?: () => void };

                                                clickableItem?.onClick ? clickableItem.onClick() : clickOption(item);

                                                setChange(true, "ignoreDefaultValue", setState);

                                            }}

                                            item={item}

                                            option={item}

                                            value={value as any}

                                            multiSelect={props.multiSelect}

                                            field={field || ""}

                                            displayField={props.displayField || ""}

                                            toggle={() => createChange(false, "showOptions")}

                                            setOutsideEscape={(e) => createChange(e, "outsideEscape")}

                                            selection={state?.selection}

                                        />

                                    </React.Fragment>
                                )}

                            {withSubmission && onSubmit &&

                                <Button

                                    label={"Submit"}

                                    className="select-submit"

                                    onClick={() => onSubmit(state.selection)}

                                />

                            }

                        </ul>
                    </div>
                }
            </div>
        </div >
    );
};

interface OptionsInputProp {

    label?: string,

    onChange?(val: string | { [key: string]: any }): void,

    onClick?(): void,

    defaultValue?: string,

    value?: string | any[],

    placeHolder?: string | React.FC,

    className: string,

    options: Array<objectOptionType | string |  (()=> ReactElement<any, string | JSXElementConstructor<any>>) >,

    onSubmit?: (e: { [key: string]: string | boolean | null | undefined | number }) => void,

    multiSelect?: boolean,

    isContextMenu: boolean,

    field?: string,

    displayField?: string,

    ellipseIcon?: string,

    onKeyDown?(e: React.KeyboardEvent): void,

    isSearchable?: boolean,

    noDropDownIcon?: boolean,

    selectorBoxClass?: string,

    withSubmission?: boolean

    asButton?: {
        svgIcon?: string,
        label: string,
        classnames: string,
    },

};
