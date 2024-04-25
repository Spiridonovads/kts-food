import * as React from 'react';
import { useState } from 'react';
import ArrowDownIcon from 'components/Icon/ArrowIcons/ArrowDownIcon';
import style from './style.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  placeholder: string;
  afterSlot?: React.ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  border?: boolean;
  size?: number;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, placeholder, afterSlot, size, value, border, onChange, ...props }, ref) => {
    const [state, setState] = useState<string>('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
    return (
      <div ref={ref} className={`${style.wrapper} ${size && style.wrapperSize} ${border && style.wrapperFocus}`}>
        <input
          {...props}
          type="text"
          className={`${style.input} ${size && style.inputSize} ${!border && style.inputFocus}`}
          disabled={!!disabled}
          onChange={onChange ? onChange : handleChange}
          value={value ? value : state}
          placeholder={placeholder}
        ></input>
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
