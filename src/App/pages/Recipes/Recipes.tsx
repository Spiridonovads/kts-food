import { Observer, observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import { useState, FormEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import RecipesContent from 'components/RecipesContent/RecipesContent';
import RecipesSkeleton from 'components/RecipesSkeleton/RecipesSkeleton';

import createRecipesAppStore from 'configs/store/RecipesStore/RecipesStore';
import { Data } from 'configs/types';
import { options } from 'utils/constants';

const Recipes: React.FC = observer(() => {
  const appStore = useLocalObservable(() => new createRecipesAppStore());
  const location = useLocation();
  const navigate = useNavigate();

  const [inputState, setInputState] = useState<string>('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<Data[]>([]);

  const params = new URLSearchParams();
  const searchParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);

  const query = React.useMemo(() => searchParams.get('query'), [searchParams]);
  const type = React.useMemo(
    () => options.filter((el) => location.search.toLowerCase().includes(el.toLowerCase())),
    [location.search],
  );

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

  const handleInputClick = () => {};

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const fetchMoreData = async () => {
    try {
      const newOffset = offset + 10;
      let newData = [];

      if (query) {
        await appStore.fetchData(query, type, offset);
        newData = appStore.data;
      } else {
        await appStore.fetchData('', type, offset);
        newData = appStore.data;
      }

      if (newData.length > 0) {
        setItems((prevItems) => [...prevItems, ...newData]);
        setOffset(newOffset);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
    }
  };

  React.useEffect(() => {
    const fetchDataAndSetItems = async () => {
      setItems([]);
      await fetchMoreData();
    };

    fetchDataAndSetItems();
  }, [type, query]);

  return appStore.data && appStore.data.length > 0 ? (
    <main>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loader size="l" />}
        style={{
          scrollbarWidth: 'none',
        }}
      >
        <Observer>
          {() => (
            <RecipesContent
              data={items}
              handleFormSubmit={() => handleFormSubmit}
              handleInputChange={handleInputChange}
              inputState={inputState}
              handleInputClick={handleInputClick}
            />
          )}
        </Observer>
      </InfiniteScroll>
    </main>
  ) : (
    <RecipesSkeleton />
  );
});
export default Recipes;
