import React from 'react';
import { IconProps } from '../Icon';

export const ArrowLeftSideIcon: React.FC<IconProps> = ({ color }) => {
  let fill =
    color === 'accent' ? '#518581' : color === 'primary' ? '#000000' : color === 'secondary' ? '#AFADB5' : 'black';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.12 26.5599L11.4267 17.8666C10.4 16.8399 10.4 15.1599 11.4267 14.1333L20.12 5.43994"
        stroke={fill}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
