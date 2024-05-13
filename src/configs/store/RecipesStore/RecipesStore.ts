import { action, makeObservable, observable, runInAction } from 'mobx';
import { Data } from 'configs/types';
import { getData } from 'utils/api';

class createRecipesAppStore {
  data: Data[] = [];
  pagination: number = 0;

  constructor() {
    makeObservable(this, {
      data: observable,
      pagination: observable,
      fetchData: action,
      resetPagination: action,
      updatePagination: action,
    });
  }

  async fetchData(query: string, types: string[], offset: number) {
    const response = await getData(query, types, offset);
    runInAction(() => {
      if (response) {
        this.data = response.results;
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
