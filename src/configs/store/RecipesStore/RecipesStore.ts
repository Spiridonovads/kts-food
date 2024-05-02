import { makeObservable, observable, runInAction, reaction, IReactionDisposer } from 'mobx';
import { Data } from 'configs/types';
import { getData, getDataQuery, getDataTypes } from 'utils/api';
import rootStore from '../index';

class createRecipesAppStore {
  data: Data[] = [];
  type: boolean = false;
  query: boolean = false;

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

  destroy(): void {
    this._typeReaction;
    this._queryReaction;
  }

  private readonly _typeReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('type'),
    () => {
      this.type = !this.type;
    },
  );
  private readonly _queryReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('query'),
    () => {
      this.query = !this.query;
    },
  );
}

export default createRecipesAppStore;
