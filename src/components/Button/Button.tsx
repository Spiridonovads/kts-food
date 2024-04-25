import * as React from 'react';
import Loader from 'components/Loader/Loader';
import style from './style.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ loading, children, disabled, onClick }) => {
  return disabled ? (
    <button
      onClick={onClick}
      className={`${style.button} ${loading && style.loadingButton} ${style.defaultButton} ${style.disabledButton}`}
      disabled={true}
    >
      {loading && <Loader size="s" color="#FFFFFF" />}
      {children}
    </button>
  ) : (
    <button onClick={onClick} className={`${style.button} ${style.defaultButton} ${style.animationButton}`}>
      {children}
    </button>
  );
};

export default Button;
