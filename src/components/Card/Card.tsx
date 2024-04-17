import React from 'react';
import style from './style.module.scss';
import { Text } from 'components/Text/Text';

export type CardProps = {
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ title, subtitle, image, onClick, ...props }) => {
  return (
    <div className={`${style.wrapper}`} onClick={onClick}>
      <img className={style.image} src={image} alt="img" />
      <div className={style.content}>
        {props.captionSlot && <Text tag="span">{props.captionSlot}</Text>}
        <Text tag="h1" weight="medium">
          {title}
        </Text>
        <Text tag="p" color="secondary" maxLines={'two'}>
          {subtitle}
        </Text>
        <div className={style.footer}>
          {props.contentSlot && <Text tag="span">{props.contentSlot}</Text>}
          {props.actionSlot}
        </div>
      </div>
    </div>
  );
};
