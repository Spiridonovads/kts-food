import React, { useContext, useEffect, useState } from 'react';
import style from './style.module.scss';
import { Text } from 'components/Text/Text';
import { ArrowLeftSideIcon } from 'components/Icon/ArrowIcons/ArrowLeftSideIcon';
import { Link } from 'react-router-dom';
import { RecipeContext } from 'configs/context';
import { getDataIngredient } from 'utils/api';
import { Loader } from 'components/Loader/Loader';
import { Data } from 'configs/types';

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

  return (
    <main>
      {data ? (
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
                  {`${data.preparationMinutes} minutes`}
                </Text>
              </div>
              <div className={style.shortInfoTextBlock}>
                <Text>Cooking</Text>
                <Text color="accent" weight="medium">
                  {`${data.cookingMinutes} minutes`}
                </Text>
              </div>
              <div className={style.shortInfoTextBlock}>
                <Text>Total</Text>
                <Text color="accent" weight="medium">
                  {`${data.cookingMinutes + data.preparationMinutes} minutes`}
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
                <Text weight="medium" view="p-20" className="title">
                  Ingredients
                </Text>
              </div>
              {data.extendedIngredients.map((el: { name: string }) => {
                return <Text>{el.name}</Text>;
              })}
            </div>
            <div className={style.equip}>
              <Text weight="medium" view="p-20" className="title">
                Equipment
              </Text>
            </div>
          </div>
        </section>
      ) : (
        <>
          <Text>Рецепты загружаются...</Text>
          <Loader size="l" />
        </>
      )}
    </main>
  );
};
