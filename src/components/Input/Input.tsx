import * as React from 'react';
import ArrowDownIcon from 'components/Icon/ArrowIcons/ArrowDownIcon';
import style from './style.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  placeholder: string;
  afterSlot?: React.ReactNode;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  border?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, placeholder, afterSlot, value, border, onChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
        ${style.intersection} 
        ${afterSlot && style.wrapperMultiDropDown} 
        ${!afterSlot && style.wrapperInput} 
        ${border && style.wrapperFocus}`}
      >
        <input
          {...props}
          type="text"
          className={`
          ${!afterSlot && style.input} 
          ${afterSlot && style.multiDropdown} 
          ${!border && style.inputFocus}`}
          disabled={!!disabled}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
        {afterSlot && (
          <div className={style.icon}>
            <ArrowDownIcon color="secondary" />
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
export default Input;
