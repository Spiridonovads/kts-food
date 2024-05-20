import { Observer, useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import SavesContent from 'components/Saves/SavesContent';
import createPersonalAppStore from 'configs/store/PersonalStore/PersonalStore';

const Saves: React.FC = () => {
  const appStore = useLocalObservable(() => new createPersonalAppStore());
  React.useEffect(() => {
    appStore.getSavedItemsData();
  }, [appStore]);

  return <Observer>{() => <SavesContent appStore={appStore} />}</Observer>;
};

export default Saves;
