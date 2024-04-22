import React from 'react';
import style from './style.module.css';
import image from '../../../public/main.png';

const RecipesMainPicture: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <img src={image} />
    </div>
  );
};

export default RecipesMainPicture;
