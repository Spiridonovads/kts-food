import * as React from 'react';
import Input from 'components/Input/Input';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { useLocalObservable } from 'mobx-react-lite';
import createPersonalAppStore from 'configs/store/PersonalStore/PersonalStore';

const PersonalLoginContent: React.FC = () => {
  const navigate = useNavigate();
  const appStore = useLocalObservable(() => new createPersonalAppStore());

  const onLogOutClick = () => {
    appStore.updateData(undefined, undefined);
    navigate('/personal');
  };

  const appStoreArray = React.useMemo(() => {
    return localStorage
      .getItem('user')
      ?.replace(/[\[\]"]/g, '')
      .split(',');
  }, [localStorage]);

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <ul className={style.list}>
          <li className={`${style.activeLi} ${style.li}`}>Personal Data</li>
          <li onClick={onLogOutClick} className={style.li}>
            Log Out
          </li>
        </ul>
        {appStoreArray && appStoreArray?.length > 0 && (
          <div className={style.personalData}>
            <Input disabled={true} placeholder={appStoreArray[0]} />
            <Input disabled={true} placeholder={appStoreArray[1]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalLoginContent;
