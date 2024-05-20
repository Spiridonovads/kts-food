import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HeartIcon from 'components/Icon/HeartIcon/HeartIcon';
import LogoIcon from 'components/Icon/LogoIcon/LogoIcon';
import ManIcon from 'components/Icon/ManIcon/MainIcon';
import Text from 'components/Text/Text';
import style from './style.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate(`/recipes`);
  };

  return (
    <header>
      <nav className={style.wrapper}>
        <div className={style.logo}>
          <div className={style.logoImg} onClick={onLogoClick}>
            <LogoIcon color="accent" />
          </div>

          <div className={style.logoText} onClick={onLogoClick}>
            <Text view="p-20" weight="bold" color="primary">
              Food Client
            </Text>
          </div>
        </div>
        <div className={style.personal}>
          <Link to={{ pathname: '/saves' }}>
            <HeartIcon color="accent" />
          </Link>

          <Link to={{ pathname: '/personal' }}>
            <ManIcon color="accent" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
