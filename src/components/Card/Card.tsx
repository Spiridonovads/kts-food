import React from 'react';
import style from './style.module.scss';
import Text from 'components/Text/Text';

export type CardProps = {
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, subtitle, image, ...props }) => {
  return (
    <div className={`${style.wrapper}`} onClick={props.onClick}>
      <img className={style.image} src={image} alt="img" />
      <div className={style.content}>
        {props.captionSlot && <Text tag="span">{props.captionSlot}</Text>}
        <Text tag="h1">{title}</Text>
        <Text tag="p">{subtitle}</Text>
        <div className={style.footer}>
          {props.contentSlot && <Text tag="span">{props.contentSlot}</Text>}
          {props.actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
