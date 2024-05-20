import { Observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import PersonalLoginContent from 'components/Personal/PersonalLoginContent/PersonalLoginContent';
import createPersonalAppStore from 'configs/store/PersonalStore/PersonalStore';
import PersonalLogoutContent from 'components/Personal/PersonalLogoutContent/PersonalLogoutContent';

const Personal: React.FC = () => {
  const appStore = useLocalObservable(() => new createPersonalAppStore());

  return !appStore.data ? (
    <PersonalLogoutContent />
  ) : (
    <Observer>{() => <PersonalLoginContent appStore={appStore} />}</Observer>
  );
};

export default Personal;
