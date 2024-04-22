import React from 'react';
import style from './style.module.scss';
import logo from '../../../public/logo.svg';
import { Text } from 'components/Text/Text';
import { ManIcon } from 'components/Icon/ManIcon/MainIcon';
import { HeartIcon } from 'components/Icon/HeartIcon/HeartIcon';
import { useLocation, Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();
  return (
    <header>
      <nav className={style.wrapper}>
        <a href="#" className={style.logo}>
          <img src={logo} alt="logo"></img>
          <Text view="p-20" weight="bold" color="primary">
            Food Client
          </Text>
        </a>
        <ul className={style.list}>
          <li>
            <Link to={{ pathname: `/recipes` }}>
              <Text
                view="p-16"
                weight={location.pathname === '/recipes' || '/' ? 'medium' : 'normal'}
                color={location.pathname === '/recipes' || '/' ? 'accent' : 'primary'}
              >
                Recipes
              </Text>
            </Link>
          </li>
          <li>
            <a href="#">
              <Text view="p-16" weight="normal" color="primary">
                Ingredients
              </Text>
            </a>
          </li>
          <li>
            <a href="#">
              <Text view="p-16" weight="normal" color="primary">
                Products
              </Text>
            </a>
          </li>
          <li>
            <a href="#">
              <Text view="p-16" weight="normal" color="primary">
                Menu Items
              </Text>
            </a>
          </li>
          <li>
            <a href="#">
              <Text view="p-16" weight="normal" color="primary">
                Meal Planning
              </Text>
            </a>
          </li>
        </ul>
        <div className={style.personal}>
          <a href="#">
            <HeartIcon color="accent" />
          </a>
          <a href="#">
            <ManIcon color="accent" />
          </a>
        </div>
      </nav>
    </header>
  );
};
