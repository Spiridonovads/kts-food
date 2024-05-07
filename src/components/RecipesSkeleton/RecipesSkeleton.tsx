import * as React from 'react';
import style from './style.module.scss';

const RecipesSkeleton: React.FC = () => {
  return (
    <>
      <section className={style.mainPic}></section>
      <section className={style.mainContent}>
        <div className={style.mainText}></div>

        <div className={style.input}></div>

        <div className={style.multiDropdown}>
          <div className={style.multiInput}></div>
        </div>

        <div className={style.cards}>
          <div className={style.card}></div>
          <div className={style.card}></div>
          <div className={style.card}></div>
        </div>
      </section>
    </>
  );
};

export default RecipesSkeleton;
