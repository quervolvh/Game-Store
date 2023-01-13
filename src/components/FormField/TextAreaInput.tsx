import React from 'react';

export const TextAreaInput: React.FC<Props> = (
  {
    label,
    onChange,
    value,
    placeHolder,
    className = '',
  }
) => {
  
  const change = (val: string) => {
    onChange && onChange(val);
  };

  return (

    <div className={`form-field ${className}`}>

      {label && <p className="form-field-title"> {label} </p>}

      <textarea
        className="form-input"
        onChange={e => change(e?.target?.value)}
        value={value}
        placeholder={placeHolder || ''}
      />

    </div>

  );
};

interface Props {

  label: string,

  onChange: (e: any) => void,

  value?: string,

  placeHolder?: string,

  className?: string

}