import React from 'react';
import style from './style.module.scss';
import Loader from 'components/Loader/Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, children, disabled }) => {
  return loading && disabled ? (
    <button className={`${style.button} ${style.loading} ${style.disabled}`} disabled={true}>
      <Loader size="s" color="#FFFFFF" />
      {children}
    </button>
  ) : disabled ? (
    <button className={`${style.button} ${style.default} ${style.disabled} `} disabled={true}>
      {children}
    </button>
  ) : loading ? (
    <button className={`${style.button} ${style.loading}`} disabled={true}>
      <Loader size="s" color="#FFFFFF" />
      {children}
    </button>
  ) : (
    <button className={`${style.button} ${style.default} ${style.animation}`}>{children}</button>
  );
};

export default Button;
