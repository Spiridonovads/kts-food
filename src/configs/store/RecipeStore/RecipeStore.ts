import { action, makeObservable, observable, runInAction } from 'mobx';
import { Data } from 'configs/types';
import { getDataIngredient } from 'utils/api';

class createRecipeAppStore {
  recipe: Data[] = [];
  equip: string[] = [];
  err: boolean = false;
  loading: boolean = false;

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
    this.loading = true;
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
          this.err = response.vegetarian ? false : true;
          return;
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      runInAction(() => {
        this.err = true;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export default createRecipeAppStore;
