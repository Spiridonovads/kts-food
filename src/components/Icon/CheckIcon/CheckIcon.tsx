import React from 'react';
import { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = ({ ...props }) => {
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
      <path d="M4 11.6129L9.87755 18L20 7" stroke={fill} strokeWidth="2" />
    </svg>
  );
};

export default CheckIcon;
