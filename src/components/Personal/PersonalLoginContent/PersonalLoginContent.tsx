import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from 'components/Input/Input';
import appStore from 'configs/store/PersonalStore/AppStore';
import style from './style.module.scss';

const PersonalLoginContent: React.FC = () => {
  const navigate = useNavigate();
  const [personalData, setPersonalData] = React.useState<string[] | undefined>();

  const onLogOutClick = () => {
    appStore.updateData(undefined, undefined);
    navigate('/personal');
  };

  React.useEffect(() => {
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
        <div className={style.list}>
          <div className={style.personal}>
            <div className={`${style.activeLi} ${style.li}`}>Personal Data</div>
            {personalData && personalData.length > 0 && (
              <div className={style.personalData}>
                <Input disabled={true} placeholder={personalData[0]} />
                <Input disabled={true} placeholder={personalData[1]} />
              </div>
            )}
          </div>

          <div onClick={onLogOutClick} className={`${style.li} ${style.logOut}`}>
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLoginContent;
