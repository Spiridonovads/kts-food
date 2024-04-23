import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import LoupeIcon from 'components/Icon/LoupeIcon/LoupeIcon';
import Input from 'components/Input/Input';
import Loader from 'components/Loader/Loader';
import MultiDropdown from 'components/MultiDropDown/MultiDropDown';
import Paginator from 'components/Paginator/Paginator';
import RecipesMainPicture from 'components/RecipesMainPicture/RecipesMainPicture';
import Text from 'components/Text/Text';
import { Data, Value } from 'configs/types';
import { getData } from 'utils/api';

import style from './style.module.css';

const Recipes: React.FC = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 9;
  const totalItems = data.length;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
      <main className={style.main}>
        <section className={style.mainPic}>
          <RecipesMainPicture />
        </section>
        <section className={style.mainContent}>
          <div className={style.mainText}>
            <Text color="primary" weight="normal" view="p-20">
              Find the perfect food and{' '}
              <Text className="underline" tag="span">
                drink ideas
              </Text>{' '}
              for every occasion, from{' '}
              <Text className="underline" tag="span">
                weeknight dinners
              </Text>{' '}
              to{' '}
              <Text className="underline" tag="span">
                holiday feasts
              </Text>
              .
            </Text>
          </div>
          {data && data.length > 0 ? (
            <>
              <div className={style.input}>
                <Input placeholder="Enter dishes" size={1} />
                <Button disabled={false}>{<LoupeIcon />}</Button>
              </div>
              <div className={style.multiDropdown}>
                <MultiDropdown options={options} />
              </div>

              <div className={style.cards}>
                {data.map((el: Data, i) => {
                  if (i >= (currentPage - 1) * itemsOnPage && i < currentPage * itemsOnPage) {
                    return <Card el={el} key={el.id}></Card>;
                  }
                })}
              </div>
            </>
          ) : (
            <>
              <Text>Рецепты загружаются...</Text>
              <Loader size="l" />
            </>
          )}
        </section>
      </main>
      <footer>
        <Paginator totalItems={totalItems} itemsOnPage={itemsOnPage} onChange={handlePageChange} />
      </footer>
    </>
  );
};

export default Recipes;
