import { runInAction } from 'mobx';
import { Observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import { useState, FormEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import RecipesContent from '../../../components/RecipesContent/RecipesContent';
import RecipesSkeleton from '../../../components/RecipesSkeleton/RecipesSkeleton';

import createRecipesAppStore from '../../../configs/store/RecipesStore/RecipesStore';
import { Data } from '../../../configs/types';
import { options } from '../../../utils/constants';

const Recipes: React.FC = () => {
  const appStore = useLocalObservable(() => new createRecipesAppStore());
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [inputState, setInputState] = useState(searchParams.get('query') ?? '');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<Data[]>([]);

  const query = React.useMemo(() => searchParams.get('query'), [searchParams]);
  const type = React.useMemo(
    () => options.filter((el) => searchParams.get('type')?.toLowerCase().includes(el.toLowerCase())),
    [searchParams],
  );

  const fetchMoreData = async () => {
    const newOffset = offset + 10;
    if (query) {
      await appStore.fetchData(query, type, offset);
    } else {
      await appStore.fetchData('', type, offset);
    }

    runInAction(() => {
      if (appStore.data.length > 0) {
        setItems((prevItems) => [...prevItems, ...appStore.data]);
        setOffset(newOffset);
      } else {
        setHasMore(false);
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(event.target.value);
    const params = new URLSearchParams();
    function setQuery() {
      if (event.target.value.trim() !== '') {
        params.set('query', event.target.value);
      }
      searchParams.forEach((value, key) => {
        if (key !== 'query') {
          params.append(key, value);
        }
      });

      navigate(`?${params.toString()}`);
    }
    setTimeout(setQuery, 1000);
  };

  const handleInputClick = () => {
    navigate(`/recipe/${716406}`);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    const fetchDataAndSetItems = async () => {
      setItems([]);
      await fetchMoreData();
    };

    fetchDataAndSetItems();
  }, [query, type]);

  return (
    <Observer>
      {() =>
        appStore.data ? (
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
              <RecipesContent
                data={items}
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
