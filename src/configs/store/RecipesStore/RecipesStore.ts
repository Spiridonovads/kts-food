import { action, makeObservable, observable, runInAction } from 'mobx';
import rootStore from 'configs/store/instance';
import { Data } from 'configs/types';
import { getData } from 'utils/api';
import { options } from 'utils/constants';

class createRecipesAppStore {
  data: Data[] = [];
  items: Data[] = [];
  pagination: number = 0;
  hasMore: boolean = true;
  err: boolean = false;
  loading: boolean = false;

  constructor() {
    makeObservable(this, {
      data: observable,
      items: observable,
      pagination: observable,
      hasMore: observable,
      err: observable,
      loading: observable,
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
    if (!query && type.length === 0) {
      this.loading = true;
    }
    try {
      const response = await getData(query, type, 100, this.pagination);

      runInAction(() => {
        if (response) {
          this.err = false;
          this.hasMore = true;
          if (response.results.length === 0) {
            this.hasMore = false;
          }
          this.data = response.results;
          this.items = [...this.items, ...response.results];
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      runInAction(() => {
        this.err = true;
        this.hasMore = false;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  resetItems() {
    this.items = [];
  }

  resetPagination() {
    this.pagination = 0;
  }

  updatePagination() {
    this.pagination += 100;
  }
}

export default createRecipesAppStore;
