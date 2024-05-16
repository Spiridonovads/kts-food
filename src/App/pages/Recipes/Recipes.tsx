import { debounce } from 'lodash';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import { useState, FormEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import RecipesContent from 'components/RecipesContent/RecipesContent';
import RecipesSkeleton from 'components/RecipesSkeleton/RecipesSkeleton';

import { options } from 'utils/constants';
import createRecipesAppStore from '../../../configs/store/RecipesStore/RecipesStore';

const Recipes: React.FC = () => {
  const appStore = useLocalObservable(() => new createRecipesAppStore());
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [inputState, setInputState] = useState(searchParams.get('query') ?? '');
  const [hasMore, setHasMore] = useState(true);

  const query = React.useMemo(() => searchParams.get('query'), [searchParams]);
  const type = React.useMemo(
    () => options.filter((el) => searchParams.get('type')?.toLowerCase().includes(el.toLowerCase())),
    [searchParams],
  );

  const fetchMoreData = async () => {
    setHasMore(true);
    await appStore.fetchMoreData();
    if (appStore.err) {
      setHasMore(false);
    }
  };

  const debounceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams();

    params.set('query', event.target.value);

    searchParams.forEach((value, key) => {
      if (key !== 'query') {
        params.append(key, value);
      }
    });

    navigate(`?${params.toString()}`);
  };

  const debouncedChangeHandler = debounce(debounceInputChange, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(event.target.value);

    if (event.target.value.trim() !== '') {
      debouncedChangeHandler(event);
    }
  };

  const handleInputClick = () => {
    const params = new URLSearchParams();
    const randomRecipe = Math.floor(Math.random() * appStore.random.length);
    const plainArray = appStore.random;

    params.set('id', plainArray[randomRecipe].id.toString());
    navigate(`/recipe?${params.toString()}`);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    appStore.resetPagination();
    appStore.resetItems();
    const fetchDataAndSetItems = async () => {
      await fetchMoreData();
    };

    fetchDataAndSetItems();
  }, [query, type]);

  React.useEffect(() => {
    const fetchDataAndSetItems = async () => {
      await appStore.fetchData(50);
    };

    fetchDataAndSetItems();
  }, []);

  return (
    <Observer>
      {() =>
        appStore.items ? (
          <main>
            <InfiniteScroll
              dataLength={appStore.items.length}
              next={fetchMoreData}
              hasMore={hasMore}
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
        )
      }
    </Observer>
  );
};
export default Recipes;
