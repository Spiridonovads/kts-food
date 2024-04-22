import React from 'react';
import { IconProps } from '../Icon';

const LidIcon: React.FC<IconProps> = ({ color }) => {
  let fill =
    color === 'accent' ? '#B5460F' : color === 'primary' ? '#000000' : color === 'secondary' ? '#AFADB5' : 'black';
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.1605 13.189C23.0466 10.3792 21.8991 7.75392 19.8988 5.75367C18.5148 4.36964 16.8316 3.39356 14.995 2.88571C14.8783 1.33494 13.5801 0.108551 12 0.108551C10.4199 0.108551 9.12175 1.3349 9.00503 2.88571C7.16847 3.39356 5.48523 4.36964 4.10124 5.75367C2.10094 7.75388 0.953486 10.3792 0.839533 13.189C0.364126 13.2677 0 13.6805 0 14.1778V14.8881C0 15.4413 0.450142 15.8914 1.00336 15.8914H22.9966C23.5499 15.8914 24 15.4413 24 14.8881V14.1778C24 13.6805 23.6359 13.2677 23.1605 13.189ZM12 1.06476C12.9736 1.06476 13.79 1.74768 13.997 2.6594C13.3445 2.54226 12.6769 2.48184 12 2.48184C11.3231 2.48184 10.6555 2.54226 10.003 2.6594C10.21 1.74768 11.0265 1.06476 12 1.06476ZM12 3.43804C17.4721 3.43804 21.953 7.76316 22.2034 13.1744H1.79663C2.04704 7.76316 6.52792 3.43804 12 3.43804ZM23.0439 14.8881C23.0439 14.9141 23.0227 14.9353 22.9967 14.9353H1.00336C0.977346 14.9353 0.956158 14.9141 0.956158 14.8881V14.1778C0.956158 14.1518 0.977346 14.1306 1.00336 14.1306H22.9967C23.0227 14.1306 23.0439 14.1518 23.0439 14.1778V14.8881Z"
        fill={fill}
      />
    </svg>
  );
};

export default LidIcon;
