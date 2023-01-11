import React from 'react';
import { classnames } from 'utils';

export const MainLayoutLegend: React.FC<props> = ({ title, subtitle, subtitleComponent , className }) => {

    return (
        <>
            {(title || subtitle || subtitleComponent) &&
                <div className={classnames("main-layout-legend" , className)} >
                    {
                        title &&
                        <div className="main-layout-legend-title">
                            <h2> {title} </h2>
                        </div>
                    }
                    {
                        subtitle &&
                        <div className="main-layout-legend-subtitle">
                            <p> {subtitle} </p>
                        </div>
                    }
                    {subtitleComponent && subtitleComponent}
                </div>
            }
        </>
    )

}
interface props {
    title?: string,
    subtitle?: string,
    subtitleComponent?: React.ReactElement<any, any>,
    className?: string
}
