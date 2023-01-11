import React, { useState } from 'react';
import { classnames } from 'utils';
import { LinkWrapper } from 'components/LinkWrapper';

export const ListOptionItem: React.FC<Props> = ({

    label,

    value,

    className = "",

    selection,

    parentItem,

    ...props

}) => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const collapsedClass = isCollapsed ? "collapsible collapsible-show" : "collapsible";
    return (

        <div
            className={`view-formatter select-category ${collapsedClass} ${className || ""}`}

            tabIndex={0}

            role={"button"}
        >

            <div

                className="view-formatter-title-box"

                onClick={() => setIsCollapsed((prevState) => !prevState)}
            >

                <p> {label || ""} </p>


            </div>

            <span className='view-formatter-span'>

                {Array.isArray(value) &&

                    value.map((item, index) => {

                        if ((typeof item !== "string" && typeof item !== "number") && (item?.label && item.value)) {

                            const isSelected = selection?.[parentItem.value] === item?.value;

                            return (

                                <LinkWrapper

                                    key={`${label}-${index}`}

                                    link={(typeof item !== "string" && item?.link) ? String(item.link) : undefined}

                                >

                                    <div

                                        className='select-category-item'

                                        onClick={() => props.onClick({ [parentItem.value]: isSelected ? false : item.value })}

                                    >

                                     

                                    </div>

                                </LinkWrapper>
                            )
                        }

                        return (


                            <p
                                key={`${label}-${index}`}
                                className={classnames("view-formatter-p")}
                            >

                                {String(item) || ""}

                            </p>
                        )


                    })

                }

            </span>

        </div>

    )
}


interface Props {

    label: string,

    parentItem: { label: string, value: string, [key: string]: string },

    value: Array<{ label: string, link?: string, value: string } | string | number>,

    onClick(e: { [key: string]: string | boolean }): void,

    className?: string,

    link?: string,

    multiSelect?: boolean,

    displayField?: string,

    selection?: { [key: string]: boolean | string | null | undefined }

}
