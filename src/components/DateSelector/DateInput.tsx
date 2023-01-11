import React, { useRef, useEffect } from 'react';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { classnames } from 'utils';

const DateInput: React.FC<InputProps> = ({
    visibility = false,
    toggleVisibility,
    onChange,
    className = "",
    selection,
    datePickerId,
    singleMode = false,
    scrollIntoView = true,
    minDate
}) => {

    const ref: React.MutableRefObject<any> = useRef();

    useOnClickOutside(ref, () => visibility ? toggleVisibility() : null);

    const select = (start: string, end: string) => {
        if (start && end) {

            start = new Date(start).toISOString();
            end = new Date(end).toISOString();

            onChange && onChange({ start, end });
        } else if (singleMode === true) {

            onChange && onChange({ start: new Date(start).toISOString() })

        }
    }

    useEffect(() => {

        if (
            window &&
            document &&
            document.getElementById(datePickerId) &&
            document.getElementsByClassName("litepicker").length !== 1 &&
            visibility
            
            ) {

            import('litepicker').then(({ Litepicker }) => {
                new Litepicker({
                    // @ts-ignore
                    element: document.getElementById(datePickerId),
                    singleMode: true,
                    inlineMode: true,
                    numberOfColumns: 1,
                    numberOfMonths: 1,
                    highlightedDays: [...selection],
                    minDate,

                }).on('preselect', (date1, date2) => {
                    select(date1?.dateInstance, date2?.dateInstance);
                })
            });
        }
        // eslint-disable-next-line
    }, [typeof window === "undefined" , visibility]);

    useEffect(()=> {

        if ( visibility && scrollIntoView && typeof window !== undefined && datePickerId ) {

            document?.getElementById(datePickerId)?.scrollIntoView({ behavior: "smooth" });

        }
    // eslint-disable-next-line
    },[visibility]);


    return (
        <div
            ref={ref}
            className={classnames('date-picker-holder', className, visibility ? "show" : '')}>

            <div className={classnames("date-picker-body", visibility ? 'fadeIn' : "")}>

                <div
                    style={{ minHeight: "200px" }}
                    id={datePickerId}
                    onClick={e => e.stopPropagation()}>
                </div>
            </div>

        </div>
    );
}

export default DateInput;

interface InputProps {
    onChange(value: { start?: string, end?: string }): void,
    value?: any | string | number,
    className?: string,
    title?: string,
    visibility: boolean,
    toggleVisibility(): void,
    selection: Date[],
    datePickerId: string,
    singleMode?: boolean,
    minDate?: Date,
    scrollIntoView?: boolean
}
