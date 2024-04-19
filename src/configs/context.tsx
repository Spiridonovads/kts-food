import { createContext, Dispatch, SetStateAction } from 'react';

interface RecipeContextType {
  recipe: string;
  setRecipe: Dispatch<SetStateAction<string>>;
}

export const RecipeContext = createContext<RecipeContextType>({
  recipe: '',
  setRecipe: () => {},
});
