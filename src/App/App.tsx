import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import { Header } from 'components/Header/Header';
import { RecipesMainPicture } from 'components/RecipesMainPicture/RecipesMainPicture';
import { Text } from 'components/Text/Text';
import { Input } from 'components/Input/Input';
import { Button } from 'components/Button/Button';
import { LoupeIcon } from 'components/Icon/LoupeIcon/LoupeIcon';
import { MultiDropdown } from 'components/MultiDropDown/MultiDropDown';
import { Card } from 'components/Card/Card';
import { getData } from 'utils/api';
import { Loader } from 'components/Loader/Loader';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import image from '../../public/404.png';

export type Data = {
  /* id: number;
  image: string;
  imageType: string;*/
  title: string;
};
export const App: React.FC = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  const options = data.reduce((acc: any, el: any) => {
    let obj: any = {
      key: `${el.id}`, // под ключом "name" хранится значение "John"
      value: `${el.title}`,
    };
    acc.push(obj);
    return acc;
  }, []);
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
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
                  <div className={style.input}>
                    <Input placeholder="Enter dishes" size={1} />
                    <Button>{<LoupeIcon />}</Button>
                  </div>
                  <div className={style.multiDropdown}>
                    <MultiDropdown options={options} />
                  </div>
                  {data ? (
                    <div className={style.cards}>
                      {data.map((el: any) => {
                        return (
                          <Card key={el.id} image={el.category.image} title={el.title} subtitle={el.description}></Card>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <Text>Рецепты загружаются...</Text>
                      <Loader size="l" />
                    </>
                  )}
                </section>
              </main>
            }
          />
          <Route
            path="*"
            element={
              <main className={style.main}>
                <img src={image} alt="page not found" className={style.notFound}></img>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
