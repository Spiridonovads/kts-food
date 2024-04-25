import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect, useState, FormEvent } from 'react';
import Loader from 'components/Loader/Loader';
import Paginator from 'components/Paginator/Paginator';
import RecipesContent from 'components/RecipesContent/RecipesContent';
import Text from 'components/Text/Text';
import { Data, Value } from 'configs/types';
import { getData } from 'utils/api';
import RecipesSkeleton from 'components/RecipesSkeleton/RecipesSkeleton';

const Recipes: React.FC = observer(() => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 9;
  const totalItems = data.length;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result.results);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };
    fetchData();
  }, []);

  const options = data.reduce((acc: Value[], el: Data) => {
    const obj: Value = {
      key: `${el.id}`,
      value: `${el.title}`,
    };
    acc.push(obj);
    return acc;
  }, []);

  return (
    <>
      <main>
        {data ? (
          <RecipesContent
            data={data}
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
