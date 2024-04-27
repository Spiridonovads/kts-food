import { Data } from 'configs/types';
import { makeObservable, observable, runInAction } from 'mobx';
import { getData, getDataIngredient } from 'utils/api';

class createAppStore {
  data: Data[] = [];
  recipe: Data[] = [];

  constructor() {
    makeObservable(this, {
      data: observable.ref,
      recipe: observable,
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

  async fetchRecipeData(id: string) {
    const response = await getDataIngredient(Number(id));
    runInAction(() => {
      if (response) {
        this.recipe.push(response);
        return;
      }
    });
  }
}

export default createAppStore;
