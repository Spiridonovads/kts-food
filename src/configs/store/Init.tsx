//import * as Router from 'react-router-dom';

import rootStore from './instance';

export const useAppStoreInit = (): void => {
  // const { search } = Router.useLocation();
  rootStore.query.equip;

  /*
	Добавим хук, который подсоединяет глобальный стор к нашему окружению. Чтобы мы могли на каждом рендере, 
	когда меняется строка поиска, отследить ее изменения и передать в стор.
	*/
};
