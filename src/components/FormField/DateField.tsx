import React, { useEffect, useState } from 'react';
import { FormError } from 'components';
import { classnames } from 'utils/index';
import DateInput from 'components/DateSelector/DateInput';
import { SetClientAvailability } from 'hooks/useIsClient';

export const DateField: React.FC<Props> = ({ label, onChange, value, placeHolder = "", className = '', ...props }) => {

    const [state, setState] = useState({
        val: "",
        uniqueId: "date-field" + Math.random().toString(36).substring(2, 5),
        visibility: false,
        showCount: 0,
        clientMode: false
    });

    const toggleVisibility = () => setState((prevState) => ({ ...prevState, visibility: !prevState.visibility }));

    const errorText = () => {
        if (typeof props.error === "string") return props.error;
        return null;
    }

    const errorOutput = errorText();

    const change = (val: string) => {
        if (onChange) {
            onChange(val);
        }
        toggleVisibility();
    };

    useEffect(() => {

        if (state.showCount > 0) {

            change(state.val || "");

        }

        setState((prevState) => ({ ...prevState, showCount: prevState.showCount + 1 }));

        // eslint-disable-next-line
    }, [state.val]);

    SetClientAvailability(e => setState((prevState) => ({ ...prevState, clientMode: e })));

    return (
        <div
            className={classnames('form-field', className, 'with-password')}>

            {label &&
                <p className="form-field-title">
                    {label}
                    {props.required === false ?
                        <i className="form-field-optional"> (Optional) </i> : <></>}
                </p>}

            <div
                className="select"
                onClick={() => props.readonly ? null : toggleVisibility()}
                onKeyDown={(e) => props.onKeyDown && props.onKeyDown(e)}
            >

                <div
                    className={value ? '' : 'form-field-placeholder'}
                    role={"button"}
                    tabIndex={0}>
                    <p> {(value || placeHolder).toString()} </p>
                </div>

                {props.svgIcon ?
                    <div className="form-field-icon" dangerouslySetInnerHTML={{ __html: props.svgIcon }} /> :
                    <div className="form-field-icon">  <i className="fas fa-calendar-day" /> </div>
                }

                <div className="form-field-date-selector" >

                    {state.clientMode &&

                        <DateInput
                            selection={[]}
                            singleMode={true}
                            onChange={(e) => !props.disabled && e.start && setState((prevState) => ({ ...prevState, val: e?.start || "" }))}
                            datePickerId={state.uniqueId}
                            visibility={state.visibility}
                            toggleVisibility={() => toggleVisibility()}
                            minDate={props.minDate}
                        />

                    }

                </div>

            </div>

            <FormError
                condition={errorOutput !== null}
                text={errorOutput ? errorOutput : ""}
                className="-"
            />

        </div>
    );
};

interface Props {
    label?: string,
    onChange?(arg: any): () => void,
    value?: string,
    placeHolder?: string,
    className?: string,
    svgIcon?: string,
    minDate?: Date,
    disabled?: boolean,
    readonly?: boolean,
    error?: boolean | string,
    onKeyDown?(e: React.KeyboardEvent): void,
    required?: boolean
}
