import { observer, useLocalObservable, useLocalStore } from 'mobx-react-lite';
import * as React from 'react';
import { createContext, useContext, ReactNode } from 'react';
import createAppStore from './AppStore';

/*export type AppStore = {
  recipe: string;
  input: string;
  setRecipe: (el: string) => void;
  setInput: (input: string) => void;
};

export type AppStoreProviderProps = {
  children: ReactNode;
};
const Context = createContext<AppStore | null>(null);

export const AppStoreProvider: React.FC<AppStoreProviderProps> = observer(({ children }) => {
  const store = useLocalObservable(() => new createAppStore());
  return <Context.Provider value={store}>{children}</Context.Provider>;
});*/

export const useAppStore = () => {
  /*const store = useContext(Context);
  if (!store) throw new Error('Use App store within provider!');
  return store;*/
  const store = useLocalObservable(() => new createAppStore());
  if (!store) throw new Error('Use App store within provider!');
  return store;
};
