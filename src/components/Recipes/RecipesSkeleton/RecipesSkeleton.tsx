import * as React from 'react';
import style from './style.module.scss';

const RecipesSkeleton: React.FC = () => {
  return (
    <>
      <section className={style.mainPic} />
      <section className={style.mainContent}>
        <div className={style.mainText} />

        <div className={style.input} />

        <div className={style.multiDropdown}>
          <div className={style.multiInput} />
        </div>

        <div className={style.cards}>
          <div className={style.card} />
          <div className={style.card} />
          <div className={style.card} />
        </div>
      </section>
    </>
  );
};

export default RecipesSkeleton;
