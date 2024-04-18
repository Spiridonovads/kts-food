import React from 'react';
import image from '../../../../public/main.png';
import style from './style.module.scss';
import { Text } from 'components/Text/Text';
import { ArrowLeftSideIcon } from 'components/Icon/ArrowIcons/ArrowLeftSideIcon';

export const Recipe: React.FC = () => {
  return (
    <main>
      <section>
        <div className={style.title}>
          <button>
            <ArrowLeftSideIcon color="accent" />
          </button>
          <Text view="p-44" weight="bold">
            Pancake Breakfast Casserole
          </Text>
        </div>

        <div className={style.shortInfo}>
          <img src={image} alt="photo" width={448} height={298} />
          <div className={style.shortInfoText}>
            <div className={style.shortInfoTextBlock}>
              <Text>Preparation</Text>
              <Text color="accent" weight="medium">
                Preparation
              </Text>
            </div>
            <div className={style.shortInfo__text}>
              <Text>Cooking</Text>
              <Text color="accent" weight="medium">
                Preparation
              </Text>
            </div>
            <div className={style.shortInfo__text}>
              <Text>Total</Text>
              <Text color="accent" weight="medium">
                Preparation
              </Text>
            </div>
            <div className={style.shortInfo__text}>
              <Text>Ratings</Text>
              <Text color="accent" weight="medium">
                Preparation
              </Text>
            </div>
            <div className={style.shortInfo__text}>
              <Text>Servings</Text>
              <Text color="accent" weight="medium">
                Preparation
              </Text>
            </div>
          </div>
        </div>
        <div className={style.textInfo}>
          <Text>
            Pancake Breakfast Casserole takes around 9 hours and 20 minutes from beginning to end. One portion of this
            dish contains approximately 13g of protein, 19g of fat, and a total of 499 calories. For $2.33 per serving,
            this recipe covers 19% of your daily requirements of vitamins and minerals. This recipe serves 8. It works
            well as a main course. 3369 people were glad they tried this recipe. It is brought to you by Foodnetwork. It
            is a good option if you're following a lacto ovo vegetarian diet. If you have sugar, baking soda, eggs, and
            a few other ingredients on hand, you can make it. It is perfect for Christmas. Taking all factors into
            account, this recipe earns a spoonacular score of 65%, which is pretty good. Similar recipes are Pancake
            Breakfast Casserole, Pancake Breakfast Casserole, and Pancake Breakfast Casserole.
          </Text>
        </div>
        <div className={style.necessary}>
          <div className={style.ingredients}>
            <Text weight="medium" view="p-20">
              Ingredients
            </Text>
          </div>
          <div className={style.equip}>
            <Text weight="medium" view="p-20">
              Equipment
            </Text>
          </div>
        </div>
      </section>
    </main>
  );
};
