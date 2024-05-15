/*import { runInAction, toJS } from 'mobx';
import { /*Observer, useLocalObservable } from 'mobx-react-lite';*/
import * as React from 'react';
/*import { useState, FormEvent } from 'react';
//import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useNavigate } from 'react-router-dom';
//import Loader from '../../../components/Loader/Loader';
//import RecipesContent from '../../../components/RecipesContent/RecipesContent';*/
import RecipesSkeleton from '../../../components/RecipesSkeleton/RecipesSkeleton';

/*import createRecipesAppStore from '../../../configs/store/RecipesStore/RecipesStore';
import { Data } from '../../../configs/types';
import { options } from '../../../utils/constants';*/

const Recipes: React.FC = () => {
  /* const appStore = useLocalObservable(() => new createRecipesAppStore());
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [inputState, setInputState] = useState(searchParams.get('query') ?? '');
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<Data[]>([]);

  const query = React.useMemo(() => searchParams.get('query'), [searchParams]);
  const type = React.useMemo(
    () => options.filter((el) => searchParams.get('type')?.toLowerCase().includes(el.toLowerCase())),
    [searchParams],
  );

  const fetchMoreData = async () => {
   // setHasMore(true);
    if (query) {
      await appStore.fetchData(query, type, appStore.pagination);
    } else {
      await appStore.fetchData('', type, appStore.pagination);
    }

    runInAction(() => {
      if (appStore.data.length > 0) {
   //     setItems((prevItems) => [...prevItems, ...appStore.data]);
        appStore.updatePagination();
      } else {
    //    setHasMore(false);
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
    const params = new URLSearchParams();
    const randomRecipe = Math.floor(Math.random() * appStore.random.length);
    const plainArray = toJS(appStore.random);

    params.set('id', plainArray[randomRecipe].id.toString());
    navigate(`/recipe?${params.toString()}`);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    appStore.resetPagination();
    setItems([]);
    const fetchDataAndSetItems = async () => {
      await fetchMoreData();
    };

    fetchDataAndSetItems();
  }, [query, type]);

  React.useEffect(() => {
    const fetchDataAndSetItems = async () => {
      if (query) {
        await appStore.fetchRandom(query, type);
      } else {
        await appStore.fetchRandom('', type);
      }
    };

    fetchDataAndSetItems();
  }, []);
*/
  return (
    /*   <Observer>
      {() =>
        appStore.data ? (
          <main>
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Loader size="l" />}
              style={{
                overflow: 'hidden',
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
        ) :*/
    <RecipesSkeleton />

    /*}
    </Observer>*/
  );
};
export default Recipes;
