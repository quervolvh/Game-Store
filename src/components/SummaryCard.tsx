import React from "react";
import { classnames } from "utils";
import { SummaryCardSvg } from "components";

export const SmallSummaryCard: React.FC<Props> = ({
    value,
    label,
    svgIcon,
    ...props
}) => {

    const onClick = () => props.onClick ? props.onClick() : null;

    return (
        <div
            className={classnames('summary-card', 'summary-card-small', props.className)}
            onClick={() => onClick()}
            onKeyDown={(e) => e.key === "Enter" && onClick && onClick()}
            role={"button"}
            tabIndex={0}
        >

            {svgIcon !== false &&

                <div
                    className="summary-card-small-icon"
                    dangerouslySetInnerHTML={{ __html: (svgIcon || SummaryCardSvg) as string }}
                />
            }


            {
                
                
                <div className="summary-card-info">

                {label && <p> {label} </p>}

                {value && <h2> {value} </h2>}

            </div>
            
            
            }


        </div>
    );

}

interface Props {
    value?: string | number,
    label?: string | number,
    svgIcon?: string | boolean,
    onClick?(): void,
    className?: string,
}
