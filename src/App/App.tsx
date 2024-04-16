import React from 'react';
import style from './style.module.css';
import { Header } from 'components/Header/Header';
import { RecipesMainPicture } from 'components/RecipesMainPicture/RecipesMainPicture';
import { Text } from 'components/Text/Text';

export const App: React.FC = () => {
  return (
    <>
      <Header></Header>
      <main className={style.main}>
        <RecipesMainPicture />
        <section className={style.textSection}>
          <Text color="primary" weight="normal" view="p-20">
            Find the perfect food and drink ideas for every occasion, from weeknight dinners to holiday feasts.
          </Text>
        </section>
      </main>
    </>
  );
};
