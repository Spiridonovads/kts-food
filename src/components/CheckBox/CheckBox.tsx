import * as React from 'react';
import style from './style.module.scss';
import classNames from 'classnames';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const className = classNames(
    props.checked && !props.disabled && `${style.checkboxChecked}`,
    props.checked && props.disabled && `${style.checkboxDisabledChecked}`,
    !props.checked && props.disabled && `${style.checkboxDisabled}`,
    !props.checked && !props.disabled && `${style.checkbox}`,
  );

  return (
    <label className={className}>
      <input type="checkbox" onChange={handleChange} {...props} />
    </label>
  );
};

export default CheckBox;
