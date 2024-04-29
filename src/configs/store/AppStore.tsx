import { Data } from 'configs/types';
import { makeObservable, observable, runInAction } from 'mobx';
import { getData, getDataIngredient } from 'utils/api';

class createAppStore {
  data: Data[] = [];
  recipe: Data[] = [];
  equip: string[] = [];

  constructor() {
    makeObservable(this, {
      data: observable.ref,
      recipe: observable,
      equip: observable,
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
        const equipmentSet = new Set<string>();
        response.analyzedInstructions.forEach((instruction: { steps: [{ equipment: [{ name: string }] }] }) => {
          instruction.steps.forEach((step) => {
            step.equipment.forEach((equip) => {
              equipmentSet.add(equip.name);
            });
          });
        });
        this.equip = Array.from(equipmentSet);
        return;
      }
    });
  }
}

export default createAppStore;
