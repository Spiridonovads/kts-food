import { action, makeObservable, observable, runInAction } from 'mobx';
import rootStore from 'configs/store/instance';
import { Data } from 'configs/types';
import { getData } from 'utils/api';
import { options } from 'utils/constants';

class createRecipesAppStore {
  data: Data[] = [];
  items: Data[] = [];
  err: boolean = false;
  pagination: number = 0;
  random: Data[] = [];

  constructor() {
    makeObservable(this, {
      data: observable,
      items: observable,
      err: observable,
      pagination: observable,
      random: observable,
      fetchData: action,
      resetItems: action,
      resetPagination: action,
      updatePagination: action,
    });
  }

  async fetchData(number: number | undefined) {
    const type = rootStore.query.getParam('type')
      ? options.filter((el) => rootStore.query.getParam('type')?.toString().toLowerCase().includes(el.toLowerCase()))
      : [];
    const query = rootStore.query.getParam('query') ? rootStore.query.getParam('query')?.toString() : '';

    const response = await getData(query, type, number, this.pagination);
    runInAction(() => {
      if (response && !number) {
        this.data = response.results;
      } else if (response && number) {
        this.random = response.results;
      }
    });
  }

  async fetchMoreData() {
    await this.fetchData(undefined);
    runInAction(() => {
      if (this.data.length > 0) {
        this.items = [...this.items, ...this.data];
        this.updatePagination();
      } else {
        this.err = true;
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
    this.pagination += 11;
  }
}

export default createRecipesAppStore;
