import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContent from 'components/RecipeContent/RecipeContent';
import RecipeSkeleton from 'components/RecipeSkeleton/RecipeSkeleton';
import { useAppStore } from '../../../configs/store/StoreProvider';

const Recipe: React.FC = observer(() => {
  const location = useLocation();
  const appStore = useAppStore();

  useEffect(() => {
    const fetchData = async () => {
      await appStore.fetchRecipeData(
        `${location.pathname
          .split('')
          .filter((el) => !isNaN(Number(el)))
          .join('')}`,
      );
    };

    fetchData();
  }, [appStore, location.pathname]);

  return (
    <main>
      {appStore.recipe && appStore.recipe.length > 0 && appStore.equip ? (
        <RecipeContent data={appStore.recipe} equipment={appStore.equip} />
      ) : (
        <RecipeSkeleton />
      )}
    </main>
  );
});

export default Recipe;
