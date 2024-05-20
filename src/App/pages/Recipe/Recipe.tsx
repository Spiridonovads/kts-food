import { Observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContent from 'components/Recipe/RecipeContent/RecipeContent';
import RecipeSkeleton from 'components/Recipe/RecipeSkeleton/RecipeSkeleton';

import createRecipeAppStore from 'configs/store/RecipeStore/RecipeStore';

const Recipe: React.FC = () => {
  const appStore = useLocalObservable(() => new createRecipeAppStore());
  const location = useLocation();
  const searchParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  const id = React.useMemo(() => searchParams.get('id'), [searchParams]);

  useEffect(() => {
    if (id) {
      appStore.fetchRecipeData(id);
    }
  }, [appStore, id]);

  return (
    <Observer>
      {() => (
        <main>
          {!appStore.loading ? (
            <RecipeContent data={appStore.recipe} equipment={appStore.equip} error={appStore.err} />
          ) : (
            <RecipeSkeleton />
          )}
        </main>
      )}
    </Observer>
  );
};

export default Recipe;
