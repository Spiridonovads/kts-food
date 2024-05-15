import { observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContent from 'components/RecipeContent/RecipeContent';
import RecipeSkeleton from 'components/RecipeSkeleton/RecipeSkeleton';

import createRecipeAppStore from 'configs/store/RecipeStore/RecipeStore';

const Recipe: React.FC = observer(() => {
  const appStore = useLocalObservable(() => new createRecipeAppStore());
  const location = useLocation();
  const searchParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  const id = React.useMemo(() => searchParams.get('id'), [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await appStore.fetchRecipeData(id);
      }
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
