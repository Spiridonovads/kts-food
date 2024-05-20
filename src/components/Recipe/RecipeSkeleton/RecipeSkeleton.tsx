import * as React from 'react';
import style from './style.module.scss';

const RecipeSkeleton: React.FC = () => {
  return (
    <section className={style.wrapper}>
      <div className={style.title} />
      <div className={style.shortInfo}>
        <div className={style.img} />

        <div className={style.shortInfoText}>
          <div className={style.shortInfoTextBlock} />
          <div className={style.shortInfoTextBlock} />
          <div className={style.shortInfoTextBlock} />
          <div className={style.shortInfoTextBlock} />
          <div className={style.shortInfoTextBlock} />
        </div>
      </div>
      <div className={style.necessary}>
        <div className={style.ingredients}>
          <div className={style.ingredientsTitle} />
          <div className={style.ingredientsList}>
            <div className={style.ingredientsLi} />
            <div className={style.ingredientsLi} />
            <div className={style.ingredientsLi} />
            <div className={style.ingredientsLi} />
            <div className={style.ingredientsLi} />
          </div>
        </div>
        <div className={style.decor}>
          <div className={style.circle} />
          <div className={style.stick} />
        </div>
        <div className={style.equip}>
          <div className={style.ingredientsTitle} />
          <div className={style.equipList}>
            <div className={style.equipLi} />
            <div className={style.equipLi} />
            <div className={style.equipLi} />
            <div className={style.equipLi} />
            <div className={style.equipLi} />
          </div>
        </div>
      </div>
      <div className={style.directions}>
        <div className={style.directionsTitle} />
        <div className={style.directionsLi} />
        <div className={style.directionsLi} />
        <div className={style.directionsLi} />
        <div className={style.directionsLi} />
      </div>
    </section>
  );
};

export default RecipeSkeleton;
