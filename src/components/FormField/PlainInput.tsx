import React, { useState } from 'react';
import { Button } from 'components/Button';
import { classnames } from 'utils/index';
import { FormError } from './FormError';

export const PlainInput: React.FC<Props> = (
    {
        type,
        label,
        onChange,
        onClick,
        value,
        placeHolder,
        className = '',
        errorClass = "-",
        withButton,
        ...props
    }
) => {

    const [visibility, setVisibility] = useState(false);

    const passwordType = visibility === true ? "text" : "password";

    const change = (val: any) => {

        if (onChange) {

            onChange(val);

        }

    };

    const errorText = () => {

        if (typeof props.error === "string") return props.error;

        return null;

    }

    const errorTextClass = () => {

        if (typeof props.error === "string") return undefined;

        return undefined;

    }

    const errorOutput = errorText();

    const ButtonAddOn = ({ ...buttonProps }) => (

        <Button
            label={buttonProps?.label}
            onClick={() => buttonProps.onClick && buttonProps.onClick()}
            disabled={buttonProps.disabled}
            className={buttonProps.className || ""}
            vectorIcon={withButton?.vectorIcon}
        />

    );

    return (
        <div
            className={
                classnames(
                    'form-field',
                    className,
                    type === 'password' && 'with-password',
                    withButton ? "with-button" : ''
                )}
        >

            {label &&

                <div className="form-field-title-block">

                    <p className="form-field-title">

                        {label}

                    </p>

                </div>

            }

            <input
                type={type === 'password' ? passwordType : type}
                className="form-input"
                onChange={(e) => !props.disabled && change(e.target.value)}
                placeholder={placeHolder}
                readOnly={props.readonly || false}
                onKeyDown={(e) => props.onKeyDown && props.onKeyDown(e)}
                onClick={() => typeof onClick === "function" && onClick()}
                onFocus={() => props.onFocus && props.onFocus()}
                onBlur={() => props.onBlur && props.onBlur()}
                {... (type !== "password" && { value })}
            />

            {type === 'password' &&

                <div className='form-field-password-toggle-box'>

                    <p

                        className='form-field-password-toggle'

                        onClick={() => setVisibility(prevState => !prevState)}

                    >

                        {visibility ? "HIDE" : "SHOW"}

                    </p>

                </div>

            }

            <FormError
                condition={errorOutput !== null}
                text={errorOutput ? errorOutput : ""}
                className={classnames(errorClass, errorTextClass() && errorTextClass())}
            />

            {withButton && <ButtonAddOn  {...withButton} />}

        </div>
    );
};

interface Props {
    type: string,
    label?: string,
    errorClass?: string,
    onChange?(arg: any): () => void,
    onClick?: () => void,
    value?: string,
    placeHolder?: string,
    className?: string,
    disabled?: boolean,
    readonly?: boolean,
    error?: boolean | string,
    withButton?: { label: string, onClick?(): void, className?: string, disabled?: boolean , vectorIcon?: string },
    onKeyDown?(e: React.KeyboardEvent): void,
    onFocus?: () => void,
    onBlur?: () => void
}
