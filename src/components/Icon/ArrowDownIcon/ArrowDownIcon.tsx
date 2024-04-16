import React from 'react';
import { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = ({ ...props }) => {
  let fill =
    props.color === 'accent'
      ? '#518581'
      : props.color === 'primary'
        ? '#000000'
        : props.color === 'secondary'
          ? '#AFADB5'
          : 'black';
  return (
    <svg width="24" height="24" {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowDownIcon;