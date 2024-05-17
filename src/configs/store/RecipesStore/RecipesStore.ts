import { action, makeObservable, observable, runInAction } from 'mobx';
import rootStore from 'configs/store/instance';
import { Data } from 'configs/types';
import { getData } from 'utils/api';
import { options } from 'utils/constants';

class createRecipesAppStore {
  data: Data[] = [];
  items: Data[] = [];
  err: boolean = true;
  pagination: number = 0;

  constructor() {
    makeObservable(this, {
      data: observable,
      items: observable,
      err: observable,
      pagination: observable,
      fetchData: action,
      resetItems: action,
      resetPagination: action,
      updatePagination: action,
    });
  }

  async fetchData() {
    const type = rootStore.query.getParam('type')
      ? options.filter((el) => rootStore.query.getParam('type')?.toString().toLowerCase().includes(el.toLowerCase()))
      : [];
    const query = rootStore.query.getParam('query') ? rootStore.query.getParam('query')?.toString() : '';

    const response = await getData(query, type, 50, this.pagination);

    runInAction(() => {
      if (response) {
        this.data = response.results;
        this.items = [...this.items, ...response.results];
        this.err = response.message ? true : false;
      }
    });
  }

  resetItems() {
    this.items = [];
  }

  resetPagination() {
    this.pagination = 0;
  }

  updatePagination() {
    this.pagination += 50;
  }
}

export default createRecipesAppStore;
