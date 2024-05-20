import * as React from 'react';
import Card from 'components/Card/Card';
import Text from 'components/Text/Text';
import createPersonalAppStore from 'configs/store/PersonalStore/PersonalStore';
import { Data } from 'configs/types';
import style from './style.module.scss';

export type SavesContentProps = {
  appStore: createPersonalAppStore;
};

const SavesContent: React.FC<SavesContentProps> = ({ appStore }) => {
  return (
    <div className={style.wrapper}>
      {appStore.savedItems && appStore.savedItems.length > 0 ? (
        <div className={style.cards}>
          {appStore.savedItems.map((el: Data, i: number) => {
            return <Card el={el} key={i}></Card>;
          })}
        </div>
      ) : (
        <div className={style.err}>
          <Text view="p-20">В ваших сохраненках пусто</Text>
        </div>
      )}
    </div>
  );
};

export default SavesContent;
