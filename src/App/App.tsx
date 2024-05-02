import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from 'components/Header/Header';
import Recipe from './pages/Recipe/Recipe';
import Recipes from './pages/Recipes/Recipes';
import { useQueryParamsStoreInit } from 'configs/store/hocs/useQueryParamsStore';

const App: React.FC = () => {
  useQueryParamsStoreInit();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        {/*<Route
            path="*"
            element={
            }
          />*/}
      </Routes>
    </>
  );
};

export default App;
