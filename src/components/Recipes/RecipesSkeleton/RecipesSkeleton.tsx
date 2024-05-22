import * as React from 'react';
import style from './style.module.scss';

const RecipesSkeleton: React.FC = () => {
  return (
    <div className={style.cards}>
      <div className={style.card} />
      <div className={style.card} />
      <div className={style.card} />
      <div className={style.card} />
      <div className={style.card} />
      <div className={style.card} />
    </div>
  );
};

export default RecipesSkeleton;
