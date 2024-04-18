import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import { RecipesMainPicture } from 'components/RecipesMainPicture/RecipesMainPicture';
import { Text } from 'components/Text/Text';
import { Input } from 'components/Input/Input';
import { Button } from 'components/Button/Button';
import { LoupeIcon } from 'components/Icon/LoupeIcon/LoupeIcon';
import { MultiDropdown } from 'components/MultiDropDown/MultiDropDown';
import { Card } from 'components/Card/Card';
import { getData } from 'utils/api';
import { Loader } from 'components/Loader/Loader';
import { Paginator } from 'components/Paginator/Paginator';

export type Data = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: string;
  nutrition: any;
};

export type Value = {
  key: string;
  value: string;
};

export const Recipes: React.FC = () => {
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

  const options = data?.reduce((acc: Value[], el: Data) => {
    let obj: Value = {
      key: `${el.id}`,
      value: `${el.title}`,
    };
    acc.push(obj);
    return acc;
  }, []);

  return (
    <>
      <main className={style.main}>
        <section>
          <RecipesMainPicture />
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
                <Button>{<LoupeIcon />}</Button>
              </div>
              <div className={style.multiDropdown}>
                <MultiDropdown options={options} />
              </div>

              <div className={style.cards}>
                {data.map((el: Data, i) => {
                  if (i >= (currentPage - 1) * itemsOnPage && i < currentPage * itemsOnPage) {
                    return (
                      <Card
                        key={el.id}
                        captionSlot={el.readyInMinutes}
                        image={el.image}
                        title={el.title}
                        subtitle={el.nutrition.ingredients.map((ingredient: { name: string }, j: number) => {
                          if (j !== el.nutrition.ingredients.length - 1) {
                            return `${ingredient.name}+`;
                          } else {
                            return ingredient.name;
                          }
                        })}
                        contentSlot={el.nutrition.nutrients[0].amount}
                        actionSlot={<Button>Save</Button>}
                      ></Card>
                    );
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
