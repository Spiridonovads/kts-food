import * as React from 'react';
import { useState, useEffect, FormEvent } from 'react';
import Paginator from 'components/Paginator/Paginator';
import RecipesContent from 'components/RecipesContent/RecipesContent';
import RecipesSkeleton from 'components/RecipesSkeleton/RecipesSkeleton';
import { Data, Value } from 'configs/types';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../../../configs/store/AppStoreProvider';

const Recipes: React.FC = observer(() => {
  const appStore = useAppStore();

  useEffect(() => {
    appStore.fetchData();
  }, [appStore]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 9;
  const totalItems = appStore.data.length;
  const [inputState, setInputState] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(event.target.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleInputClick = () => {
    //button
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const options = React.useMemo(
    () =>
      appStore.data.reduce((acc: Value[], el: Data) => {
        const obj: Value = {
          key: `${el.id}`,
          value: `${el.title}`,
        };
        acc.push(obj);
        return acc;
      }, []),
    [appStore.data],
  );

  return (
    <>
      <main>
        {appStore.data && appStore.data.length > 0 ? (
          <RecipesContent
            data={appStore.data}
            handleFormSubmit={() => handleFormSubmit}
            handleInputChange={() => handleInputChange}
            inputState={inputState}
            handleInputClick={() => handleInputClick}
            options={options}
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
