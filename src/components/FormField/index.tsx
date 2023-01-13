import React, { ReactElement } from 'react';
import { PlainInput } from './PlainInput';
import { OptionsInput } from './OptionInput';
import { DateField } from './DateField';
import { TextAreaInput } from './TextAreaInput';

export const FormField: React.FC<Props> = (props) => {

    const redefinedProps = {
        ...props,
        className: props.className ? props.className : ""
    }

    let RenderElement: ReactElement | any = () => null;

    switch (props?.type) {

        case 'option':
            RenderElement = OptionsInput;
            break;

        case 'date':
            RenderElement = DateField;
            break;

        case 'text-area':
            RenderElement = TextAreaInput;
            break;

        default:
            RenderElement = PlainInput;
    }

    return (
        <RenderElement {...redefinedProps} />
    );
};

interface Props {
    type?: 'plain' | 'password' | 'option' | 'date' | 'text-area',
    options?: any,
    noDropDownIcon?: boolean,
    label?: string,
    onChange?: (e?: any) => void,
    value?: string | undefined | null | number | boolean,
    placeHolder?: string | React.FC | React.ReactElement,
    className?: string,
    disabled?: boolean,
    error?: boolean | string,
    onKeyDown?(e: React.KeyboardEvent): void,
    errorClass?: string,
    onClick?(): void,
    onFocus?: () => void,
    onBlur?: () => void,
    selectorBoxClass?: string,
    isContextMenu?: boolean,
    multiSelect?: boolean,
    withSubmission?: boolean,
    defaultValue?: string | number,
    withButton?: { label?: string, onClick?(): void, className?: string, disabled?: boolean, vectorIcon?: string },
}
