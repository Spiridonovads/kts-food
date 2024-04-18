import React from 'react';
import style from './style.module.scss';
import { Text } from 'components/Text/Text';
import { ClockIcon } from 'components/Icon/ClockIcon/ClockIcon';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button/Button';
import { Data } from 'configs/types';

export type CardProps = {
  el: Data;
};

export const Card: React.FC<CardProps> = ({ el }) => {
  return (
    <Link to={{ pathname: `/recipe` }}>
      <div className={`${style.wrapper}`}>
        <img className={style.image} src={el.image} alt="img" />
        <div className={style.content}>
          <div className={style.text}>
            <div className={style.timer}>
              <ClockIcon color="accent" />
              <Text tag="span" color="secondary" view="p-14">
                {`${el.readyInMinutes} minutes`}
              </Text>
            </div>

            <Text tag="h1" weight="medium" view="p-20" maxLines={'one'}>
              {el.title}
            </Text>
            <Text tag="p" color="secondary" maxLines={'two'} view="p-16">
              {el.nutrition.ingredients.map((ingredient: { name: string }, i: number) => {
                if (i !== el.nutrition.ingredients.length - 1) {
                  return `${ingredient.name}+`;
                } else {
                  return ingredient.name;
                }
              })}
            </Text>
          </div>
          <div className={style.footer}>
            <Text tag="span" view="p-18" weight="bold" color="accent">
              {`${el.nutrition.nutrients[0].amount} kcal`}
            </Text>
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
