import createRecipeAppStore from 'configs/store/RecipeStore/RecipeStore';
//import createRecipesAppStore from "configs/store/RecipesStore/RecipesStore";

export default class RootStore {
  readonly query = new createRecipeAppStore();
}
