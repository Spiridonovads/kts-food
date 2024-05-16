import { action, makeObservable, observable, runInAction } from 'mobx';
import { Data } from 'configs/types';
import { getData } from 'utils/api';
import rootStore from 'configs/store/instance';
import { options } from 'utils/constants';

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

  async fetchData() {
    const type = rootStore.query.getParam('type')
      ? options.filter((el) => rootStore.query.getParam('type')?.toString().toLowerCase().includes(el.toLowerCase()))
      : [];
    const query = rootStore.query.getParam('query') ? rootStore.query.getParam('query')?.toString() : '';

    const response = await getData(query, type, undefined, this.pagination);
    runInAction(() => {
      if (response) {
        this.data = response.results;
      }
    });
  }

  async fetchRandom() {
    const type = rootStore.query.getParam('type')
      ? options.filter((el) => rootStore.query.getParam('type')?.toString().toLowerCase().includes(el.toLowerCase()))
      : [];
    const query = rootStore.query.getParam('query') ? rootStore.query.getParam('query')?.toString() : '';
    const response = await getData(query, type, 50, 10);

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
    this.pagination += 11;
  }
}

export default createRecipesAppStore;
