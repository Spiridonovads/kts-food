import React from 'react';
import style from './style.module.scss';

export type TextProps = {
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
};

export const Text: React.FC<TextProps> = ({ view, weight, color, maxLines, tag, children }) => {
  let viewClassName = view ? `${style[view]}` : '';
  let weightClassName = weight ? `${style[weight]}` : '';
  let colorClassName = color ? `${style[color]}` : '';
  let maxLinesClassName = maxLines ? `${style[maxLines]}` : '';

  if (tag === 'h1') {
    return <h1 className={`${viewClassName} ${weightClassName} ${colorClassName} ${maxLinesClassName}`}>{children}</h1>;
  } else if (tag === 'h2') {
    return <h2 className={`${viewClassName} ${weightClassName} ${colorClassName} ${maxLinesClassName}`}>{children}</h2>;
  } else if (tag === 'h3') {
    return <h3 className={`${viewClassName} ${weightClassName} ${colorClassName} ${maxLinesClassName}`}>{children}</h3>;
  } else if (tag === 'h4') {
    return <h4 className={`${viewClassName} ${weightClassName} ${colorClassName} ${maxLinesClassName}`}>{children}</h4>;
  } else if (tag === 'h5') {
    return <h5 className={`${viewClassName} ${weightClassName} ${colorClassName} ${maxLinesClassName}`}>{children}</h5>;
  } else if (tag === 'h6') {
    return <h6 className={`${viewClassName} ${weightClassName} ${colorClassName} ${maxLinesClassName}`}>{children}</h6>;
  } else if (tag === 'div') {
    return (
      <div className={`${viewClassName} ${weightClassName} ${colorClassName} ${maxLinesClassName}`}>{children}</div>
    );
  } else if (tag === 'span') {
    return (
      <span className={`${viewClassName} ${weightClassName} ${colorClassName} ${maxLinesClassName}`}>{children}</span>
    );
  } else {
    return <p className={`${viewClassName} ${weightClassName} ${colorClassName} ${maxLinesClassName}`}>{children}</p>;
  }
};
