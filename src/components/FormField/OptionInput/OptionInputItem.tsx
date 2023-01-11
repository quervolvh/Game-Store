import React from 'react';
import { ReactElement } from 'react';
import { LinkWrapper } from 'components/LinkWrapper';
import { ListOptionItem } from './ListOptionItem';
import { classnames } from 'utils';
import { objectOptionType } from 'types';

export const OptionInputItem: React.FC<DisplayOptionProps> = ({

    click, multiSelect, item,

    displayField, toggle, setOutsideEscape, selection, ...props

}) => {

    const isObjPrimitive = typeof props.option === "string" || typeof props.option === "number";

    const optionObject = (typeof props.option === "object" ? props.option : {}) as objectOptionType;

    const parentItemObject = item as { [key: string]: string, label: string, value: string };

    const clicker = (e: any) => {

        // const parentItemType = typeof item;

        // const isParentPrimitive = parentItemType === "string" || parentItemType === "number";

        const isArray = Array.isArray(item);

        const selectionStatus = optionObject?.value ? selection?.[optionObject?.value] : false;

        e.stopPropagation();

        if (!isArray && !multiSelect) {

            click(item);

            return;

        };

        if (!isArray && multiSelect) {

            click({ [parentItemObject.value]: !selectionStatus });

            return;

        }

        if (!multiSelect && optionObject.onClick) {

            toggle();

            if ( optionObject.onClick && typeof optionObject.onClick === "function") optionObject.onClick();

            return;

        }

    }

    if (typeof item === "function") return <li onClick={() => setOutsideEscape(false)}> {item()} </li>;

    return (

        <LinkWrapper

            link={!isObjPrimitive ? optionObject?.link : undefined}

            externalLink={!isObjPrimitive ? optionObject?.externalLink : undefined}

        >

            <li className={classnames(optionObject.options && "select-category-li")}>

                <div

                    onClick={(e) => !optionObject.options ? clicker(e) : null}

                >

                    {Array.isArray(optionObject.options) &&

                        <ListOptionItem

                            onClick={(e: { [key: string]: string }) => click && click(e)}

                            label={optionObject.label}

                            value={optionObject.options}

                            displayField={displayField}

                            multiSelect={true}

                            selection={selection}

                            parentItem={parentItemObject}

                        />


                    }



                </div>



            </li>

        </LinkWrapper>
    )

}

interface DisplayOptionProps {

    click(item: string | number | { [key: string]: string | boolean }): void,

    value: string | any[],

    multiSelect?: boolean,

    option: string | ReactElement | objectOptionType | any,

    field: string,

    displayField: string,

    toggle(): void,

    setOutsideEscape(e: boolean): void,

    selection?: { [key: string]: boolean | null | string | undefined },

    item: string | React.FC | any | { [key: string]: any }

}
