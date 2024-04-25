import * as React from 'react';
import { Link } from 'react-router-dom';
import ArrowLeftSideIcon from 'components/Icon/ArrowIcons/ArrowLeftSideIcon';
import LidIcon from 'components/Icon/NecessaryIcons/LidIcon';
import SpoonIcon from 'components/Icon/NecessaryIcons/SpoonIcon';
import RecipeShortText from 'components/RecipeShortText/RecipeShortText';
import RecipeText from 'components/RecipeText/RecipeText';
import Text from 'components/Text/Text';
import { Data } from 'configs/types';
import style from './style.module.scss';

export type RecipeContentProps = {
  data: Data;
  equipment: string[];
};

const RecipeContent: React.FC<RecipeContentProps> = ({ data, equipment }) => {
  return (
    <section className={style.wrapper}>
      <div className={style.title}>
        <Link to={{ pathname: '/recipes' }}>
          <ArrowLeftSideIcon color="accent" />
        </Link>
        <Text view="p-44" weight="bold">
          {data.title}
        </Text>
      </div>
      <div className={style.shortInfo}>
        <img src={data.image} alt="photo" width={448} height={298} />
        <div className={style.shortInfoText}>
          <div className={style.shortInfoTextBlock}>
            <RecipeShortText title="Preparation" text={`${Math.abs(data.preparationMinutes)} minutes`} />
          </div>
          <div className={style.shortInfoTextBlock}>
            <RecipeShortText title="Cooking" text={`${data.readyInMinutes} minutes`} />
          </div>
          <div className={style.shortInfoTextBlock}>
            <RecipeShortText
              title="Total"
              text={`${data.readyInMinutes + Math.abs(data.preparationMinutes)} minutes`}
            />
          </div>
          <div className={style.shortInfoTextBlock}>
            <RecipeShortText title="Ratings" text={`${data.aggregateLikes} likes`} />
          </div>
          <div className={style.shortInfoTextBlock}>
            <RecipeShortText title="Servings" text={`${data.servings} servings`} />
          </div>
        </div>
      </div>
      {data && Object.keys(data).length > 0 && <RecipeText htmlString={data.summary} />}
      <div className={style.necessary}>
        <div className={style.ingredients}>
          <div className={style.ingredientsTitle}>
            <Text weight="medium" view="p-20">
              Ingredients
            </Text>
          </div>
          <div className={style.ingredientsList}>
            {data.extendedIngredients.map((el, i: number) => {
              return (
                <div key={i} className={style.ingredientsLi}>
                  <LidIcon key={`${i}1`} color="accent" />
                  <Text key={`${i}2`}>{el.name}</Text>
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.decor}>
          <div className={style.circle}></div>
          <div className={style.stick}></div>
        </div>
        <div className={style.equip}>
          <div className={style.ingredientsTitle}>
            <Text weight="medium" view="p-20">
              Equipment
            </Text>
          </div>
          <div className={style.equipList}>
            {equipment &&
              equipment.map((el: string, i: number) => {
                return (
                  <div key={`${i}3`} className={style.equipLi}>
                    <SpoonIcon key={`${i}4`} color="accent" />
                    <Text key={`${i}5`}>{el}</Text>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className={style.directions}>
        <div className={style.directionsTitle}>
          <Text weight="medium" view="p-20">
            Directions
          </Text>
        </div>
        {data.analyzedInstructions[0].steps.map((el, i: number) => {
          return (
            <div key={`${i}6`} className={style.directionsLi}>
              <Text key={`${i}7`} weight="medium">{`Step ${i + 1}`}</Text>
              <Text key={`${i}8`}>{el.step}</Text>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecipeContent;
