import React from 'react';
import { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = ({ color }) => {
  let fill =
    color === 'accent' ? '#518581' : color === 'primary' ? '#000000' : color === 'secondary' ? '#AFADB5' : 'black';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 11.6129L9.87755 18L20 7" stroke={fill} strokeWidth="2" />
    </svg>
  );
};

export default CheckIcon;
