import { useLocalObservable } from 'mobx-react-lite';
import createAppStore from './AppStore';

export const useAppStore = () => {
  const store = useLocalObservable(() => new createAppStore());
  if (!store) throw new Error('Use App store within provider!');
  return store;
};
