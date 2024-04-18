import React from 'react';
import style from './style.module.scss';
import { Text } from 'components/Text/Text';
import { ClockIcon } from 'components/Icon/ClockIcon/ClockIcon';

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
        <div className={style.text}>
          {props.captionSlot && (
            <div className={style.timer}>
              <ClockIcon color="accent" />
              <Text tag="span" color="secondary" view="p-14">
                {`${props.captionSlot} minutes`}
              </Text>
            </div>
          )}
          <Text tag="h1" weight="medium" view="p-20" maxLines={'one'}>
            {title}
          </Text>
          <Text tag="p" color="secondary" maxLines={'two'} view="p-16">
            {subtitle}
          </Text>
        </div>
        <div className={style.footer}>
          {props.contentSlot && (
            <Text tag="span" view="p-18" weight="bold" color="accent">
              {`${props.contentSlot} kcal`}
            </Text>
          )}
          {props.actionSlot}
        </div>
      </div>
    </div>
  );
};
