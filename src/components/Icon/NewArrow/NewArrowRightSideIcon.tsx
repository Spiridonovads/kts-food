import * as React from 'react';
import { IconProps } from '../Icon';

const NewArrowRightSideIcon: React.FC<IconProps> = ({ color }) => {
  const fill =
    color === 'accent' ? '#518581' : color === 'primary' ? '#000000' : color === 'secondary' ? '#AFADB5' : 'white';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 12H20M20 12L16 8M20 12L16 16"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NewArrowRightSideIcon;
