import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button/Button';
import ClockIcon from 'components/Icon/ClockIcon/ClockIcon';
import Text from 'components/Text/Text';
import { Data } from 'configs/types';

import style from './style.module.scss';

export type CardProps = {
  el: Data;
};

const Card: React.FC<CardProps> = ({ el }) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <Link to={{ pathname: `/recipe/${el.id}` }}>
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

            <Button onClick={onClick} disabled={false}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default observer(Card);
