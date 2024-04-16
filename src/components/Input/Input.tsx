import React, { useState } from 'react';
import style from './style.module.scss';
import Icon from 'components/Icon/ArrowDownIcon/ArrowDownIcon';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  placeholder: string;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, placeholder, afterSlot, size }, ref) => {
    const [state, setState] = useState<string>('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
    return (
      <div ref={ref} className={style.wrapper}>
        <input
          type="text"
          className={`${style.input} ${size ? style.size : ''}`}
          disabled={!!disabled}
          onChange={handleChange}
          value={state}
          placeholder={placeholder}
        ></input>
        {afterSlot && (
          <div className={style.icon}>
            <Icon color="secondary" />
          </div>
        )}
      </div>
    );
  },
);
