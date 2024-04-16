import React from 'react';
import style from './style.module.scss';

export type TextProps = {
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

export const Text: React.FC<TextProps> = ({ view, weight, color, maxLines, tag, children }) => {
  let view_className = view ? `${style[view]}` : ``;
  let weight_className = weight ? `${style[weight]}` : ``;
  let color_className = color ? `${style[color]}` : ``;
  let maxLines_className = maxLines ? `${style[maxLines]}` : ``;

  if (tag === 'h1') {
    return (
      <h1 className={`${view_className} ${weight_className} ${color_className} ${maxLines_className}`}>{children}</h1>
    );
  } else if (tag === 'h2') {
    return (
      <h2 className={`${view_className} ${weight_className} ${color_className} ${maxLines_className}`}>{children}</h2>
    );
  } else if (tag === 'h3') {
    return (
      <h3 className={`${view_className} ${weight_className} ${color_className} ${maxLines_className}`}>{children}</h3>
    );
  } else if (tag === 'h4') {
    return (
      <h4 className={`${view_className} ${weight_className} ${color_className} ${maxLines_className}`}>{children}</h4>
    );
  } else if (tag === 'h5') {
    return (
      <h5 className={`${view_className} ${weight_className} ${color_className} ${maxLines_className}`}>{children}</h5>
    );
  } else if (tag === 'h6') {
    return (
      <h6 className={`${view_className} ${weight_className} ${color_className} ${maxLines_className}`}>{children}</h6>
    );
  } else if (tag === 'div') {
    return (
      <div className={`${view_className} ${weight_className} ${color_className} ${maxLines_className}`}>{children}</div>
    );
  } else if (tag === 'span') {
    return (
      <span className={`${view_className} ${weight_className} ${color_className} ${maxLines_className}`}>
        {children}
      </span>
    );
  } else {
    return (
      <p className={`${view_className} ${weight_className} ${color_className} ${maxLines_className}`}>{children}</p>
    );
  }
};
