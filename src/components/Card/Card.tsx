import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import CheckIcon from 'components/Icon/CheckIcon/CheckIcon';
import ClockIcon from 'components/Icon/ClockIcon/ClockIcon';
import Text from 'components/Text/Text';
import { Data } from 'configs/types';

import style from './style.module.scss';

export type CardProps = {
  el: Data;
};

const Card: React.FC<CardProps> = ({ el }) => {
  const navigate = useNavigate();
  const [buttonState, setButtonState] = React.useState(false);
  const location = useLocation();

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (localStorage.getItem(`${el.title}`)) {
      localStorage.removeItem(`${el.title}`);
      setButtonState(false);
    } else {
      localStorage.setItem(`${el.title}`, JSON.stringify(el));
      setButtonState(true);
    }
    if (location.pathname === '/saves') {
      navigate('/saves');
    }
  };

  const onWrapperClick = () => {
    const params = new URLSearchParams();
    params.set('id', el.id.toString());
    navigate(`/recipe?${params.toString()}`);
  };

  return (
    <div className={`${style.wrapper}`} onClick={onWrapperClick}>
      <div className={style.imgWrapper}>
        <img className={style.image} src={el.image} alt="Проблема при загрузке фото" />
      </div>
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

          <Button onClick={onButtonClick} disabled={false}>
            {localStorage.getItem(`${el.title}`) || buttonState ? <CheckIcon /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(Card);
