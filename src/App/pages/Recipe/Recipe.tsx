import * as React from 'react';
import { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import Text from 'components/Text/Text';
import { Data } from 'configs/types';
import { getDataIngredient } from 'utils/api';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../../../configs/store/AppStoreProvider';
import RecipeContent from 'components/RecipeContent/RecipeContent';
import { useLocation } from 'react-router-dom';

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
      {data && Object.keys(data).length > 0 ? (
        <RecipeContent data={data} equipment={equipArr} />
      ) : (
        <>
          <Text>Рецепт загружается...</Text>
          <Loader size="l" />
        </>
      )}
    </main>
  );
});

export default Recipe;
