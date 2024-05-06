import * as React from 'react';
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
          <Input placeholder="Enter dishes" size={1} onChange={handleInputChange} value={inputState} />
          <Button onClick={handleInputClick} disabled={false}>
            {<LoupeIcon />}
          </Button>
        </form>

        <div className={style.multiDropdown}>
          <MultiDropdown options={options} />
        </div>

        <div className={style.cards}>
          {data.map((el: Data, i: number) => {
            return <Card el={el} key={i}></Card>;
          })}
        </div>
      </section>
    </>
  );
};

export default RecipesContent;
