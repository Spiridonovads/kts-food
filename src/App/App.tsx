import React from 'react';
import style from './style.module.css';
import { Header } from 'components/Header/Header';
import { RecipesMainPicture } from 'components/RecipesMainPicture/RecipesMainPicture';
import { Text } from 'components/Text/Text';
import { Input } from 'components/Input/Input';
import { Button } from 'components/Button/Button';
import { LoupeIcon } from 'components/Icon/LoupeIcon/LoupeIcon';

export const App: React.FC = () => {
  return (
    <>
      <Header></Header>
      <main className={style.main}>
        <section className={style.textSection}>
          <RecipesMainPicture />
          <div className={style.mainText}>
            <Text color="primary" weight="normal" view="p-20">
              Find the perfect food and drink ideas for every occasion, from weeknight dinners to holiday feasts.
            </Text>
          </div>
          <div className={style.input}>
            <Input placeholder="Enter dishes" size={1} />
            <Button>{<LoupeIcon />}</Button>
          </div>
        </section>
      </main>
    </>
  );
};
