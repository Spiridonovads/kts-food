export type Data = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  servings: number;
  summary: string;
  extendedIngredients: [{ name: string }];
  analyzedInstructions: [
    {
      steps: [{ id: number; step: string }];
    },
  ];
};

export type Value = {
  key: string;
  value: string;
};
