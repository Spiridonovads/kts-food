import { debounce } from 'lodash';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import { useState, FormEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import RecipesContent from 'components/RecipesContent/RecipesContent';
import RecipesSkeleton from 'components/RecipesSkeleton/RecipesSkeleton';

import createRecipesAppStore from 'configs/store/RecipesStore/RecipesStore';
import { options } from 'utils/constants';

const Recipes: React.FC = () => {
  const appStore = useLocalObservable(() => new createRecipesAppStore());
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [inputState, setInputState] = useState(searchParams.get('query') ?? '');

  const query = React.useMemo(() => searchParams.get('query'), [searchParams]);
  const type = React.useMemo(
    () => options.filter((el) => searchParams.get('type')?.toLowerCase().includes(el.toLowerCase())),
    [searchParams],
  );

  const fetchMoreData = async () => {
    appStore.updateHasMore();
    appStore.updatePagination();
    await appStore.fetchData();
    if (appStore.data.length === 0) {
      appStore.resetHasMore();
    }
  };

  const debounceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams();

    if (event.target.value.trim() === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    searchParams.forEach((value, key) => {
      if (key !== 'query') {
        params.append(key, value);
      }
    });

    navigate(`?${params.toString()}`);
  };

  const debouncedChangeHandler = debounce(debounceInputChange, 1000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() !== inputState) {
      debouncedChangeHandler(event);
    }

    setInputState(event.target.value);
  };

  const handleInputClick = () => {
    const params = new URLSearchParams();
    const randomRecipe = Math.floor(Math.random() * appStore.data.length);
    const plainArray = appStore.data;

    params.set('id', plainArray[randomRecipe].id.toString());
    navigate(`/recipe?${params.toString()}`);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    appStore.resetPagination();
    appStore.resetItems();

    appStore.fetchData();
  }, [query, type]);

  return (
    <Observer>
      {() => (
        <>
          {appStore.items && appStore.items.length > 0 ? (
            <main>
              <InfiniteScroll
                dataLength={appStore.items?.length}
                next={fetchMoreData}
                hasMore={appStore.hasMore}
                loader={<Loader size="l" />}
                style={{
                  overflow: 'hidden',
                }}
              >
                <RecipesContent
                  data={appStore.items}
                  handleFormSubmit={() => handleFormSubmit}
                  handleInputChange={handleInputChange}
                  inputState={inputState}
                  handleInputClick={handleInputClick}
                />
              </InfiniteScroll>
            </main>
          ) : (
            <RecipesSkeleton />
          )}
        </>
      )}
    </Observer>
  );
};
export default Recipes;
