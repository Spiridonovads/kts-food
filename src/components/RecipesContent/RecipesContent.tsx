import * as React from 'react';
import ArrowDownIcon from 'components/Icon/ArrowIcons/ArrowDownIcon';
import CloseIcon from 'components/Icon/CloseIcon/CloseIcon';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import LoupeIcon from 'components/Icon/LoupeIcon/LoupeIcon';
import Input from 'components/Input/Input';

import MultiDropdown from 'components/MultiDropDown/MultiDropDown';
import RecipesMainPicture from 'components/RecipesMainPicture/RecipesMainPicture';
import Text from 'components/Text/Text';
import { Data } from 'configs/types';
import { options } from 'utils/constants';

import style from './style.module.scss';

export type RecipesContentProps = {
  data: Data[];
  handleFormSubmit: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputState: string;
  handleInputClick: () => void;
};

const RecipesContent: React.FC<RecipesContentProps> = ({
  data,
  handleFormSubmit,
  handleInputChange,
  inputState,
  handleInputClick,
}) => {
  const [popUpState, setPopUpState] = React.useState(false);
  const onClick = () => {
    setPopUpState(false);
  };
  React.useEffect(() => {
    setPopUpState(true);
  }, []);
  return (
    <>
      <section className={style.mainPic}>
        <RecipesMainPicture />
      </section>

      <section className={style.mainContent}>
        <div className={style.mainText}>
          <Text color="primary" weight="normal" view="p-20">
            Find the perfect food and{' '}
            <Text className="underline" tag="span">
              drink ideas
            </Text>{' '}
            for every occasion, from{' '}
            <Text className="underline" tag="span">
              weeknight dinners
            </Text>{' '}
            to{' '}
            <Text className="underline" tag="span">
              holiday feasts
            </Text>
            .
          </Text>
        </div>

        <form onSubmit={handleFormSubmit} className={style.input}>
          {popUpState && (
            <div className={style.popUp}>
              <div className={style.ArrowUpIcon}>
                <ArrowDownIcon />
              </div>
              <div className={style.popUpCloser} onClick={onClick}>
                <CloseIcon />
              </div>
              <Text view="p-14">Получить случайный рецепт</Text>
              <div className={style.ArrowDownIcon}>
                <ArrowDownIcon />
              </div>
            </div>
          )}
          <Input placeholder="Enter dishes" onChange={handleInputChange} value={inputState} />
          <Button onClick={handleInputClick} disabled={false}>
            {<LoupeIcon />}
          </Button>
        </form>

        <div className={style.multiDropdown}>
          <MultiDropdown options={options} />
        </div>
        {data.length > 0 ? (
          <div className={style.cards}>
            {data.map((el: Data, i: number) => {
              return <Card el={el} key={i}></Card>;
            })}
          </div>
        ) : (
          <div className={style.noRes}>
            <Text color="primary" weight="normal" view="p-20">
              Совпадений не найдено
            </Text>
          </div>
        )}
      </section>
    </>
  );
};

export default RecipesContent;
