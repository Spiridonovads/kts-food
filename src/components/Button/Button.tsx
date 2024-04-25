import * as React from 'react';
import Loader from 'components/Loader/Loader';
import style from './style.module.scss';
import classNames from 'classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
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
