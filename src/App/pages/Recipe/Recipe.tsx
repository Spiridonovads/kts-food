import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContent from 'components/RecipeContent/RecipeContent';
import { Data } from 'configs/types';
import { getDataIngredient } from 'utils/api';
import { useAppStore } from '../../../configs/store/AppStoreProvider';
import RecipeSkeleton from 'components/RecipeSkeleton/RecipeSkeleton';

const equipment: Set<unknown> = new Set();

const Recipe: React.FC = observer(() => {
  const location = useLocation();

  const appStore = useAppStore();

  const [data, setData] = useState<Data>();

  useEffect(() => {
    appStore.setRecipe(
      `${location.pathname
        .split('')
        .filter((el) => !isNaN(Number(el)))
        .join('')}`,
    );
    const fetchData = async () => {
      try {
        const result = await getDataIngredient(Number(appStore.recipe));
        setData(result);

        result.analyzedInstructions[0].steps.forEach((el: { equipment: [{ name: string }] }) => {
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

  const equipArr: string[] = Array.from(equipment) as string[];
  return (
    <main>
      {data && Object.keys(data).length > 0 ? <RecipeContent data={data} equipment={equipArr} /> : <RecipeSkeleton />}
    </main>
  );
});

export default Recipe;
