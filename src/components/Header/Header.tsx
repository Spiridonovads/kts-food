import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeartIcon from 'components/Icon/HeartIcon/HeartIcon';
import LogoIcon from 'components/Icon/LogoIcon/LogoIcon';
import ManIcon from 'components/Icon/ManIcon/MainIcon';
import Text from 'components/Text/Text';
import style from './style.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate('/recipes');
  };

  return (
    <header>
      <nav className={style.wrapper}>
        <div className={style.logo}>
          <div className={style.logoImg} onClick={onLogoClick}>
            <LogoIcon color="accent" />
          </div>

          <Link to={{ pathname: '/recipes' }}>
            <Text view="p-20" weight="bold" color="primary">
              Food Client
            </Text>
          </Link>
        </div>
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
