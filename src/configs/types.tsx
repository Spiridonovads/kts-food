import { ReactNode } from 'react';

export type Data = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: string;
  nutrition: any;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  servings: number;
  summary: ReactNode;
  extendedIngredients: [];
};

export type Value = {
  key: string;
  value: string;
};
