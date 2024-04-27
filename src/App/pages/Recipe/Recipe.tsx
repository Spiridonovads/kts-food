import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContent from 'components/RecipeContent/RecipeContent';
import RecipeSkeleton from 'components/RecipeSkeleton/RecipeSkeleton';
import { useAppStore } from '../../../configs/store/AppStoreProvider';

const Recipe: React.FC = observer(() => {
  const location = useLocation();
  const appStore = useAppStore();
  const [equipment, setEquipment] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await appStore.fetchRecipeData(
        `${location.pathname
          .split('')
          .filter((el) => !isNaN(Number(el)))
          .join('')}`,
      );
      if (appStore.recipe) {
        const equipmentSet = new Set<string>();
        appStore.recipe[0].analyzedInstructions[0].steps.forEach((el: { equipment: [{ name: string }] }) => {
          if (el.equipment[0]) {
            equipmentSet.add(el.equipment[0].name);
          }
        });
        setEquipment(Array.from(equipmentSet));
      }
    };

    fetchData();
  }, [appStore, location.pathname]);

  return (
    <main>
      {appStore.recipe && appStore.recipe.length > 0 ? (
        <RecipeContent data={appStore.recipe} equipment={equipment} />
      ) : (
        <RecipeSkeleton />
      )}
    </main>
  );
});

export default Recipe;
