import { action, makeObservable, observable, runInAction } from 'mobx';
import { Data } from 'configs/types';
import { getDataIngredient } from 'utils/api';

class createRecipeAppStore {
  recipe: Data[] = [];
  equip: string[] = [];
  err: boolean = false;
  loading: boolean = true;

  constructor() {
    makeObservable(this, {
      recipe: observable,
      equip: observable,
      err: observable,
      loading: observable,
      fetchRecipeData: action,
    });
  }

  async fetchRecipeData(id: string) {
    try {
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
          this.loading = false;
          return;
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      runInAction(() => {
        this.err = true;
        this.loading = false;
      });
    }
  }
}

export default createRecipeAppStore;
