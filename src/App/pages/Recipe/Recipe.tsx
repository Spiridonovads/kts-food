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

export const Recipe: React.FC = () => {
  const [data, setData] = useState<Data>();
  const recipeContext = useContext(RecipeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataIngredient(Number(recipeContext.recipe));
        setData(result);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  const equipment = data?.analyzedInstructions[0].steps.reduce((acc: any, el: { equipment: any }) => {
    if (el.equipment.length > 0 && acc) {
      if (!acc.includes(el.equipment[0].name)) {
        acc = [...acc, el.equipment[0].name];
      }
      return acc;
    }
  }, []);

  return (
    <main>
      {data && Object.keys(data).length > 0 ? (
        <section>
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
                <Text>Preparation</Text>
                <Text color="accent" weight="medium">
                  {`${Math.abs(data.preparationMinutes)} minutes`}
                </Text>
              </div>
              <div className={style.shortInfoTextBlock}>
                <Text>Cooking</Text>
                <Text color="accent" weight="medium">
                  {`${data.readyInMinutes} minutes`}
                </Text>
              </div>
              <div className={style.shortInfoTextBlock}>
                <Text>Total</Text>
                <Text color="accent" weight="medium">
                  {`${data.readyInMinutes + Math.abs(data.preparationMinutes)} minutes`}
                </Text>
              </div>
              <div className={style.shortInfoTextBlock}>
                <Text>Ratings</Text>
                <Text color="accent" weight="medium">
                  {`${data.aggregateLikes} likes`}
                </Text>
              </div>
              <div className={style.shortInfoTextBlock}>
                <Text>Servings</Text>
                <Text color="accent" weight="medium">
                  {`${data.servings} servings`}
                </Text>
              </div>
            </div>
          </div>
          <div className={style.textInfo}>{data.summary}</div>
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
            <div className={style.equip}>
              <div className={style.ingredientsTitle}>
                <Text weight="medium" view="p-20">
                  Equipment
                </Text>
              </div>
              <div className={style.ingredientsList}>
                {equipment.map((el: string, i: number) => {
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
                <div key={el.id} className={style.directionsLi}>
                  <Text weight="medium">{`Step ${i + 1}`}</Text>
                  <Text>{el.step}</Text>
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
