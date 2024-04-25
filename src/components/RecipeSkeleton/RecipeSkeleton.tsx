import * as React from 'react';
import style from './style.module.scss';

const RecipeSkeleton: React.FC = () => {
  return (
    <section className={style.wrapper}>
      <div className={style.title}></div>
      <div className={style.shortInfo}>
        <div className={style.img}></div>

        <div className={style.shortInfoText}>
          <div className={style.shortInfoTextBlock}></div>
          <div className={style.shortInfoTextBlock}></div>
          <div className={style.shortInfoTextBlock}></div>
          <div className={style.shortInfoTextBlock}></div>
          <div className={style.shortInfoTextBlock}></div>
        </div>
      </div>
      <div className={style.necessary}>
        <div className={style.ingredients}>
          <div className={style.ingredientsTitle}></div>
          <div className={style.ingredientsList}>
            <div className={style.ingredientsLi}></div>
            <div className={style.ingredientsLi}></div>
            <div className={style.ingredientsLi}></div>
            <div className={style.ingredientsLi}></div>
            <div className={style.ingredientsLi}></div>
          </div>
        </div>
        <div className={style.decor}>
          <div className={style.circle}></div>
          <div className={style.stick}></div>
        </div>
        <div className={style.equip}>
          <div className={style.ingredientsTitle}></div>
          <div className={style.equipList}>
            <div className={style.equipLi}></div>
            <div className={style.equipLi}></div>
            <div className={style.equipLi}></div>
            <div className={style.equipLi}></div>
            <div className={style.equipLi}></div>
          </div>
        </div>
      </div>
      <div className={style.directions}>
        <div className={style.directionsTitle}></div>
      </div>
    </section>
  );
};

export default RecipeSkeleton;

/*
 <img src={data.image} alt="photo" width={448} height={298} /> */
