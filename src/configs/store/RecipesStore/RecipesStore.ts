import { Data } from 'configs/types';
import { makeObservable, observable, runInAction } from 'mobx';
import { getData } from 'utils/api';

class createRecipesAppStore {
  data: Data[] = [];

  constructor() {
    makeObservable(this, {
      data: observable.ref,
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
}

export default createRecipesAppStore;
