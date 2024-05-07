import * as React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import HeartIcon from 'components/Icon/HeartIcon/HeartIcon';
import ManIcon from 'components/Icon/ManIcon/MainIcon';
import Text from 'components/Text/Text';
import style from './style.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate('/recipes');
  };
  const location = useLocation();
  return (
    <header>
      <nav className={style.wrapper}>
        <div className={style.logo}>
          <div className={style.logoImg} onClick={onLogoClick} />

          <Link to={{ pathname: '/recipes' }}>
            <Text view="p-20" weight="bold" color="primary">
              Food Client
            </Text>
          </Link>
        </div>
        <ul className={style.list}>
          <li>
            <Link to={{ pathname: `/recipes` }}>
              <Text
                view="p-16"
                weight={location.pathname === '/recipes' || location.pathname === '/' ? 'medium' : 'normal'}
                color={location.pathname === '/recipes' || location.pathname === '/' ? 'accent' : 'primary'}
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

export default Header;
