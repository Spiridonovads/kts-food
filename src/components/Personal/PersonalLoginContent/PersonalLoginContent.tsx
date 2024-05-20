import { useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from 'components/Input/Input';
import createPersonalAppStore from 'configs/store/PersonalStore/PersonalStore';
import style from './style.module.scss';

const PersonalLoginContent: React.FC = () => {
  const navigate = useNavigate();
  const appStore = useLocalObservable(() => new createPersonalAppStore());
  const [personalData, setPersonalData] = React.useState<string[] | undefined>();

  const onLogOutClick = () => {
    appStore.updateData(undefined, undefined);
    navigate('/personal');
  };

  React.useEffect(() => {
    //appStore.getPersonalData();
    setPersonalData(
      localStorage
        .getItem('user')
        ?.replace(/[\]["]/g, '')
        .split(','),
    );
  }, [appStore]);

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <ul className={style.list}>
          <li className={`${style.activeLi} ${style.li}`}>Personal Data</li>
          <li onClick={onLogOutClick} className={style.li}>
            Log Out
          </li>
        </ul>
        {personalData && personalData.length > 0 && (
          <div className={style.personalData}>
            <Input disabled={true} placeholder={personalData[0]} />
            <Input disabled={true} placeholder={personalData[1]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalLoginContent;
