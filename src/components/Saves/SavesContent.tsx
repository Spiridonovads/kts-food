import * as React from 'react';
import Card from 'components/Card/Card';
import Text from 'components/Text/Text';
import { Data } from 'configs/types';
import style from './style.module.scss';

export type SavesContentProps = {
  items: Data[];
};

const SavesContent: React.FC<SavesContentProps> = ({ items }) => {
  return (
    <div className={style.wrapper}>
      {items && items.length > 0 ? (
        <div className={style.cards}>
          {items.map((el: Data, i: number) => {
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
