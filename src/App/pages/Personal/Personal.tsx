import { useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import PersonalLoginContent from 'components/Personal/PersonalLoginContent/PersonalLoginContent';
import PersonalLogoutContent from 'components/Personal/PersonalLogoutContent/PersonalLogoutContent';
import createPersonalAppStore from 'configs/store/PersonalStore/PersonalStore';

const Personal: React.FC = () => {
  const appStore = useLocalObservable(() => new createPersonalAppStore());

  React.useEffect(() => {
    appStore.getUser();
  }, [appStore]);

  return !localStorage.getItem('user') ? <PersonalLogoutContent /> : <PersonalLoginContent />;
};

export default Personal;
