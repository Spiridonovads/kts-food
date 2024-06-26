import * as React from 'react';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import CloseIcon from 'components/Icon/CloseIcon/CloseIcon';
import LoupeIcon from 'components/Icon/LoupeIcon/LoupeIcon';
import NewArrowRightSideIcon from 'components/Icon/NewArrow/NewArrowRightSideIcon';
import Input from 'components/Input/Input';

import MultiDropdown from 'components/MultiDropDown/MultiDropDown';
import RecipesMainPicture from 'components/Recipes/RecipesMainPicture/RecipesMainPicture';
import RecipesSkeleton from 'components/Recipes/RecipesSkeleton/RecipesSkeleton';
import Text from 'components/Text/Text';
import { Data } from 'configs/types';
import { options } from 'utils/constants';

import style from './style.module.scss';

export type RecipesContentProps = {
  data: Data[];
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputState: string;
  handleRandomClick: () => void;
  error: boolean;
  loading: boolean;
};

const RecipesContent: React.FC<RecipesContentProps> = ({
  data,
  handleInputChange,
  inputState,
  handleRandomClick,
  error,
  loading,
}) => {
  const [popUpState, setPopUpState] = React.useState(false);
  const onPopUpClick = () => {
    setPopUpState(false);
  };
  React.useEffect(() => {
    setPopUpState(true);
  }, []);

  return !error ? (
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

        <form className={style.input}>
          {popUpState && (
            <div className={style.popUp}>
              <div className={style.popUpCloser} onClick={onPopUpClick}>
                <CloseIcon />
              </div>
              <Text view="p-14">Случайный Рецепт</Text>
              <NewArrowRightSideIcon />
            </div>
          )}
          <Input placeholder="Enter dishes" onChange={handleInputChange} value={inputState} />
          <Button onClick={handleRandomClick} disabled={false}>
            {<LoupeIcon />}
          </Button>
        </form>

        <div className={style.multiDropdown}>
          <MultiDropdown options={options} />
        </div>
        {loading && <RecipesSkeleton />}
        {data.length > 0 && (
          <div className={style.cards}>
            {data.map((el: Data, i: number) => {
              return <Card el={el} key={i}></Card>;
            })}
          </div>
        )}
        {data.length === 0 && (
          <div className={style.noRes}>
            <Text color="primary" weight="normal" view="p-20">
              Совпадений не найдено
            </Text>
          </div>
        )}
      </section>
    </>
  ) : (
    <div className={style.noRes}>
      <Text color="primary" weight="normal" view="p-20">
        При загрузке данных произошла ошибка
      </Text>
    </div>
  );
};

export default RecipesContent;
