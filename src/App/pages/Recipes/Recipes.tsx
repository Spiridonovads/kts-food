import { debounce } from 'lodash';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import RecipesContent from 'components/Recipes/RecipesContent/RecipesContent';

import createRecipesAppStore from 'configs/store/RecipesStore/RecipesStore';
import { options } from 'utils/constants';

const Recipes: React.FC = () => {
  const appStore = useLocalObservable(() => new createRecipesAppStore());
  const location = useLocation();
  const navigate = useNavigate();
  const searchURLParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [, setSearchParams] = useSearchParams();

  const [inputState, setInputState] = useState(searchURLParams.get('query') ?? '');

  const query = React.useMemo(() => searchURLParams.get('query'), [searchURLParams]);
  const type = React.useMemo(
    () => options.filter((el) => searchURLParams.get('type')?.toLowerCase().includes(el.toLowerCase())),
    [searchURLParams],
  );

  const fetchMoreData = () => {
    appStore.updatePagination();
    appStore.fetchData();
  };

  const debounceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams();

    if (event.target.value.trim() === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    searchURLParams.forEach((value, key) => {
      if (key !== 'query') {
        params.append(key, value);
      }
    });
    setSearchParams(params);
  };

  const debouncedChangeHandler = debounce(debounceInputChange, 1000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() !== inputState) {
      debouncedChangeHandler(event);
    }

    setInputState(event.target.value);
  };

  const handleRandomClick = () => {
    const params = new URLSearchParams();
    const randomRecipe = Math.floor(Math.random() * appStore.data.length);
    const plainArray = appStore.data;

    params.set('id', plainArray[randomRecipe]?.id.toString());
    navigate(`/recipe?${params.toString()}`);
  };

  React.useEffect(() => {
    appStore.resetPagination();
    appStore.resetItems();

    appStore.fetchData();
  }, [query, type]);

  return (
    <Observer>
      {() => (
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
              handleInputChange={handleInputChange}
              inputState={inputState}
              handleRandomClick={handleRandomClick}
              error={appStore.err}
              loading={appStore.loading}
            />
          </InfiniteScroll>
        </main>
      )}
    </Observer>
  );
};
export default Recipes;
