import React from 'react';
import style from './style.module.css';
import image from './image 2.png';

export const RecipesMainPicture: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <img src={image} />
    </div>
  );
};
