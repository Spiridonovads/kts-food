import { observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import { useState, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecipesContent from 'components/RecipesContent/RecipesContent';
import RecipesSkeleton from 'components/RecipesSkeleton/RecipesSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

import createRecipesAppStore from 'configs/store/RecipesStore/RecipesStore';
import { options } from 'utils/constants';

const Recipes: React.FC = observer(() => {
  const appStore = useLocalObservable(() => new createRecipesAppStore());
  const location = useLocation();
  const navigate = useNavigate();

  const [inputState, setInputState] = useState<string>('');

  const params = new URLSearchParams();
  const searchParams = new URLSearchParams(location.search);

  const query = React.useMemo(() => searchParams.get('query'), [searchParams]);
  const type = React.useMemo(() => options.filter((el) => location.search.includes(el)), [location.search]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(event.target.value);
    params.set('query', event.target.value);
    searchParams.forEach((value, key) => {
      if (key !== 'query') {
        params.append(key, value);
      }
    });
    navigate(`?${params.toString()}`);
  };

  const handleFetchData = () => {};

  const handleInputClick = () => {};

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    if (query) {
      appStore.fetchData(query, type);
    } else {
      appStore.fetchData('', type);
    }
  }, [query, type]);

  return appStore.data && appStore.data.length > 0 ? (
    <main>
      <RecipesContent
        data={appStore.data}
        handleFormSubmit={() => handleFormSubmit}
        handleInputChange={handleInputChange}
        inputState={inputState}
        handleInputClick={handleInputClick}
      />
    </main>
  ) : (
    <RecipesSkeleton />
  );
});
export default Recipes;
