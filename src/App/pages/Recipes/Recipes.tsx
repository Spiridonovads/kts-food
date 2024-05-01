import * as React from 'react';
import { useState, useEffect, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Paginator from 'components/Paginator/Paginator';
import RecipesContent from 'components/RecipesContent/RecipesContent';
import RecipesSkeleton from 'components/RecipesSkeleton/RecipesSkeleton';
import { observer } from 'mobx-react-lite';
import { useLocalObservable } from 'mobx-react-lite';
import createRecipesAppStore from 'configs/store/RecipesStore/RecipesStore';
import { options } from 'utils/constants';

const Recipes: React.FC = observer(() => {
  const appStore = useLocalObservable(() => new createRecipesAppStore());
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(location.search ? Number(location.search.split('=')[1]) : 1);
  const itemsOnPage = 9;
  const totalItems = appStore.data.length;
  const [inputState, setInputState] = useState<string>('');
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    searchParams.set('', `${currentPage}`);
    navigate({ search: searchParams.toString() });
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(event.target.value);
    searchParams.set('query', event.target.value);
    navigate({ search: searchParams.toString() });
  };

  const handleInputClick = () => {
    appStore.fetchQuery(inputState);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    appStore.fetchQuery(inputState);
  };

  useEffect(() => {
    if (location.search.includes('type=')) {
      appStore.fetchSelectedOptions(options.filter((el) => location.search.includes(el)));
    } else if (location.search.includes('query=')) {
      appStore.fetchQuery(location.search.split('=')[2]);
    } else {
      appStore.fetchData();
    }
  }, [appStore, location]);

  return (
    <>
      <main>
        {appStore.data && appStore.data.length > 0 ? (
          <RecipesContent
            data={appStore.data}
            handleFormSubmit={() => handleFormSubmit}
            handleInputChange={handleInputChange}
            inputState={inputState}
            handleInputClick={handleInputClick}
            currentPage={currentPage}
            itemsOnPage={itemsOnPage}
          />
        ) : (
          <RecipesSkeleton />
        )}
      </main>
      <footer>
        <Paginator totalItems={totalItems} itemsOnPage={itemsOnPage} onChange={handlePageChange} />
      </footer>
    </>
  );
});
export default Recipes;
