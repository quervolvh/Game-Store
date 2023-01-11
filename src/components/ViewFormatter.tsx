import React from "react";
import { classnames } from "utils";

export const ViewFormatter: React.FC<Props> = ({ value, label, className }) => {

    const loading = className === "view-formatter-loader" || className === "view-formatter-loader-label";

    return (

        <div className={classnames("view-formatter", className)}>

            {(value || loading) && <h1 className="view-formatter-value"> {value} </h1>}

            {(label || loading) && <p className="view-formatter-label"> {label} </p>}

        </div>

    )

}

interface Props {

    value?: string,

    label?: string,

    className?: string

}
