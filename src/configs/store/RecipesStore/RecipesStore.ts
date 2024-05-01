import { makeObservable, observable, runInAction } from 'mobx';
import { Data } from 'configs/types';
import { getData, getDataQuery, getDataTypes } from 'utils/api';
/*import rootStore from '../index';
import { reaction, IReactionDisposer } from 'mobx';*/

class createRecipesAppStore {
  data: Data[] = [];

  constructor() {
    makeObservable(this, {
      data: observable,
    });
  }

  async fetchData() {
    const response = await getData();
    runInAction(() => {
      if (response) {
        this.data = response.results;
        return;
      }
    });
  }

  async fetchSelectedOptions(options: string[]) {
    const response = await getDataTypes(options);
    runInAction(() => {
      if (response) {
        this.data = response.results;
        return;
      }
    });
  }

  async fetchQuery(query: string) {
    const response = await getDataQuery(query);
    runInAction(() => {
      if (response) {
        this.data = response.results;
        return;
      }
    });
  }

  /*  destroy(): void {
    this._qpReaction;
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('types'),
    (search) => {
      console.log('search value change', search);
    },
  );*/
}

export default createRecipesAppStore;
