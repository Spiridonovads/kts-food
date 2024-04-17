import React from 'react';
import style from './style.module.scss';
import { Loader } from 'components/Loader/Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ loading, children, disabled }) => {
  return loading && disabled ? (
    <button className={`${style.button} ${style.loadingButton} ${style.disabledButton}`} disabled={true}>
      <Loader size="s" color="#FFFFFF" />
      {children}
    </button>
  ) : disabled ? (
    <button className={`${style.button} ${style.defaultButton} ${style.disabledButton} `} disabled={true}>
      {children}
    </button>
  ) : loading ? (
    <button className={`${style.button} ${style.loadingButton}`} disabled={true}>
      <Loader size="s" color="#FFFFFF" />
      {children}
    </button>
  ) : (
    <button className={`${style.button} ${style.defaultButton} ${style.animationButton}`}>{children}</button>
  );
};
