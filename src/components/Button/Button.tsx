import classNames from 'classnames';
import * as React from 'react';
import Loader from '../Loader/Loader';
import style from './style.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: React.FC<ButtonProps> = ({ loading, children, disabled, onClick }) => {
  const className = classNames(
    `${style.button}`,
    `${style.defaultButton}`,
    loading && `${style.loadingButton}`,
    disabled && `${style.disabledButton}`,
    !disabled && `${style.animationButton}`,
  );

  return (
    <button onClick={onClick} className={className} disabled={!!disabled}>
      {loading && <Loader size="s" color="#FFFFFF" />}
      {children}
    </button>
  );
};

export default Button;
