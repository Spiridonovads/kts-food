export type Data = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  nutrition: {
    ingredients: [{ name: string }];
    nutrients: [{ amount: number }];
  };
  servings: number;
  summary: string;
  extendedIngredients: [{ name: string }];
  analyzedInstructions: [
    {
      steps: [];
    },
  ];
};

export type Value = {
  key: string;
  value: string;
};
