import React, { useContext, useEffect, useState } from 'react';
import style from './style.module.scss';
import { Text } from 'components/Text/Text';
import { ArrowLeftSideIcon } from 'components/Icon/ArrowIcons/ArrowLeftSideIcon';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../../App';
import { getDataIngredient } from 'utils/api';
import { Loader } from 'components/Loader/Loader';
import { Data } from 'configs/types';
import { LidIcon } from 'components/Icon/NecessaryIcons/LidIcon';
import { SpoonIcon } from 'components/Icon/NecessaryIcons/SpoonIcon';
import { RecipeText } from 'components/RecipeText/RecipeText';
import { RecipeShortText } from 'components/RecipeShortText/RecipeShortText';

let equipment = new Set();

export const Recipe: React.FC = () => {
  const [data, setData] = useState<Data>();
  const recipeContext = useContext(RecipeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataIngredient(Number(recipeContext.recipe));
        setData(result);

        result.analyzedInstructions[0].steps.forEach((el: { equipment: any }) => {
          if (el.equipment[0]) {
            equipment.add(el.equipment[0].name);
          }
        });
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      {data && Object.keys(data).length > 0 ? (
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
                {data.extendedIngredients.map((el: { name: string }, i: number) => {
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
              <div className={style.ingredientsList}>
                {equipment &&
                  equipment.size >= 1 &&
                  Array.from(equipment).map((el: any, i: number) => {
                    return (
                      <div key={`${i}3`} className={style.ingredientsLi}>
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
            {data.analyzedInstructions[0].steps.map((el: { id: number; step: string }, i: number) => {
              return (
                <div key={`${i}6`} className={style.directionsLi}>
                  <Text key={`${i}7`} weight="medium">{`Step ${i + 1}`}</Text>
                  <Text key={`${i}8`}>{el.step}</Text>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <>
          <Text>Рецепт загружается...</Text>
          <Loader size="l" />
        </>
      )}
    </main>
  );
};

/**  */
