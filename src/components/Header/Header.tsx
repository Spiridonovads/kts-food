import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import HeartIcon from 'components/Icon/HeartIcon/HeartIcon';
import LogoIcon from 'components/Icon/LogoIcon/LogoIcon';
import ManIcon from 'components/Icon/ManIcon/MainIcon';
import Text from 'components/Text/Text';
import appStore from 'configs/store/PersonalStore/AppStore';
import style from './style.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
          {location.pathname === '/saves' ? (
            <div className={`${style.active} ${style.icon}`}>
              <Link to={{ pathname: '/saves' }}>
                <HeartIcon color="secondary" />
              </Link>
              {appStore.savesNumber > 0 && (
                <div className={`${style.popUp} ${style.popUpActive}`}>{appStore.savesNumber}</div>
              )}
            </div>
          ) : (
            <div className={style.icon}>
              <Link to={{ pathname: '/saves' }}>
                <HeartIcon color="accent" />
              </Link>
              {appStore.savesNumber > 0 && (
                <Link to={{ pathname: '/saves' }}>
                  <div className={style.popUp}>{appStore.savesNumber}</div>
                </Link>
              )}
            </div>
          )}
          {location.pathname === '/personal' ? (
            <div className={`${style.active} ${style.icon}`}>
              <Link to={{ pathname: '/personal' }}>
                <ManIcon color="secondary" />
              </Link>
            </div>
          ) : (
            <div className={style.icon}>
              <Link to={{ pathname: '/personal' }}>
                <ManIcon color="accent" />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default observer(Header);
