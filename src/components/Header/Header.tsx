import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeartIcon from 'components/Icon/HeartIcon/HeartIcon';
import LogoIcon from 'components/Icon/LogoIcon/LogoIcon';
import ManIcon from 'components/Icon/ManIcon/MainIcon';
import Text from 'components/Text/Text';
import style from './style.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onLogoClick = () => {
    const params = new URLSearchParams();
    const searchParams = new URLSearchParams(location.search);

    searchParams.forEach((value, key) => {
      params.append(key, value);
    });

    navigate(`/?${params.toString()}`);
  };

  return (
    <header>
      <nav className={style.wrapper}>
        <div className={style.logo}>
          <div className={style.logoImg} onClick={onLogoClick}>
            <LogoIcon color="accent" />
          </div>

          <div onClick={onLogoClick}>
            <Text view="p-20" weight="bold" color="primary">
              Food Client
            </Text>
          </div>
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
