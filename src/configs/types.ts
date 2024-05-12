export type DataNutrition = {
  ingredients: [{ name: string }];
  nutrients: [{ amount: number }];
};

export type DataExtendedIngredients = {
  name: string;
};

export type DataAnalyzedInstructions = {
  steps: [];
};
export type Data = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  nutrition: DataNutrition;
  servings: number;
  summary: string;
  extendedIngredients: [DataExtendedIngredients];
  analyzedInstructions: [DataAnalyzedInstructions];
  dishTypes: string;
};
