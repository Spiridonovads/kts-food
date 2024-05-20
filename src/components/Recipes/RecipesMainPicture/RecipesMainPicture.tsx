import * as React from 'react';
import image from '../../../../public/main.png';
import style from './style.module.css';

const RecipesMainPicture: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <img src={image} />
    </div>
  );
};

export default RecipesMainPicture;
