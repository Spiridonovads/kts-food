import { createContext, useContext, ReactNode } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { createAppStore } from './AppStore';

export type AppStore = {
  recipe: any;
  setRecipe: (el: {}) => void;
};

export type AppStoreProviderProps = {
  children: ReactNode;
};
const Context = createContext<AppStore | null>(null);

export const AppStoreProvider: React.FC<AppStoreProviderProps> = observer(({ children, ...props }) => {
  const store = useLocalObservable(() => createAppStore(props));
  return <Context.Provider value={store}>{children}</Context.Provider>;
});

export const useAppStore = () => {
  const store = useContext(Context);
  if (!store) throw new Error('Use App store within provider!');
  return store;
};
