import React from 'react';
import style from './style.module.css';
import { Header } from 'components/Header/Header';
import { RecipesMainPicture } from 'components/RecipesMainPicture/RecipesMainPicture';
import { Text } from 'components/Text/Text';
import { Input } from 'components/Input/Input';
import { Button } from 'components/Button/Button';
import { LoupeIcon } from 'components/Icon/LoupeIcon/LoupeIcon';
import { MultiDropdown } from 'components/MultiDropDown/MultiDropDown';
import { Card } from 'components/Card/Card';
import image from '../../public/main.png';

export const App: React.FC = () => {
  const options: any = [
    { key: 'msk', value: 'Москва' },
    { key: 'spb', value: 'Санкт-Петербург' },
    { key: 'ekb', value: 'Екатеринбург' },
    { key: 'ekb', value: 'Екатеринбург' },
    { key: 'ekb', value: 'Екатеринбург' },
    { key: 'ekb', value: 'Екатеринбург' },
    { key: 'ekb', value: 'Екатеринбург' },
    { key: 'ekb', value: 'Екатеринбург' },
    { key: 'ekb', value: 'Екатеринбург' },
  ];
  return (
    <>
      <Header></Header>
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
          <div className={style.cards}>
            {options.map(() => {
              return (
                <Card
                  image={image}
                  title="Pancakes With Berries"
                  subtitle="milk + sugar + flour + vegetable oil + bakingpowder + egg"
                ></Card>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};
