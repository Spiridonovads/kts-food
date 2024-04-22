import React, { useState, createContext, Dispatch, SetStateAction } from 'react';
import Header from 'components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Recipes from './pages/Recipes/Recipes';
import Recipe from './pages/Recipe/Recipe';

interface RecipeContextType {
  recipe: string;
  setRecipe: Dispatch<SetStateAction<string>>;
}

export const RecipeContext = createContext<RecipeContextType>({
  recipe: '',
  setRecipe: () => {},
});

const App: React.FC = () => {
  const Provider = RecipeContext.Provider;
  const [recipe, setRecipe] = useState<string>('');

  return (
    <Provider value={{ recipe, setRecipe }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe" element={<Recipe />} />
          {/*<Route
            path="*"
            element={
            }
          />*/}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
