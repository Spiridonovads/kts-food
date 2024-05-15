import { action, makeObservable, observable, runInAction } from 'mobx';
import { Data } from 'configs/types';
import { getData } from 'utils/api';

class createRecipesAppStore {
  data: Data[] = [];
  pagination: number = 0;
  random: Data[] = [];

  constructor() {
    makeObservable(this, {
      data: observable,
      pagination: observable,
      random: observable,
      fetchData: action,
      fetchRandom: action,
      resetPagination: action,
      updatePagination: action,
    });
  }

  async fetchData(query: string, types: string[], offset: number) {
    const response = await getData(query, types, undefined, offset);
    runInAction(() => {
      if (response) {
        this.data = response.results;
      }
    });
  }

  async fetchRandom() {
    const response = await getData('', [], 50, 10);

    runInAction(() => {
      if (response) {
        this.random = response.results;
      }
    });
  }

  resetPagination() {
    this.pagination = 0;
  }

  updatePagination() {
    this.pagination += 10;
  }

  /* destroy(): void {
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
  );*/
}

export default createRecipesAppStore;
