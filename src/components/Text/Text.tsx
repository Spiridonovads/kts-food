import * as React from 'react';
import style from './style.module.scss';
import classNames from 'classnames';

export type TextProps = {
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14' | 'p-44';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: string;
  className?: string;
};

const Text: React.FC<TextProps> = ({ view, weight, color, maxLines, tag, children, className }) => {
  const textClassName = classNames(
    view && `${style[view]}`,
    weight && `${style[weight]}`,
    color && `${style[color]}`,
    maxLines && `${style[maxLines]}`,
    className && `${style[className]}`,
  );

  if (tag === 'h1') {
    return <h1 className={textClassName}>{children}</h1>;
  }
  if (tag === 'h2') {
    return <h2 className={textClassName}>{children}</h2>;
  }
  if (tag === 'h3') {
    return <h3 className={textClassName}>{children}</h3>;
  }
  if (tag === 'h4') {
    return <h4 className={textClassName}>{children}</h4>;
  }
  if (tag === 'h5') {
    return <h5 className={textClassName}>{children}</h5>;
  }
  if (tag === 'h6') {
    return <h6 className={textClassName}>{children}</h6>;
  }
  if (tag === 'div') {
    return <div className={textClassName}>{children}</div>;
  }
  if (tag === 'span') {
    return <span className={textClassName}>{children}</span>;
  }
  if (!tag || tag === 'p') {
    return <p className={textClassName}>{children}</p>;
  }
};

export default Text;
