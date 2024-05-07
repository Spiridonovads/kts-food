import * as React from 'react';
import Text from 'components/Text/Text';
import style from './style.module.scss';

const NotFound: React.FC = () => {
  return (
    <section className={style.wrapper}>
      <Text weight="bold" view="p-44">
        404
      </Text>
      <Text weight="bold" view="p-44">
        Страница не найдена
      </Text>
    </section>
  );
};

export default NotFound;
