import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from 'components/Header/Header';
import NotFound from 'components/NotFound/NotFound';
import { useQueryParamsStoreInit } from 'configs/store/hooks/useQueryParamsStore';
import Recipe from './pages/Recipe/Recipe';
import Recipes from './pages/Recipes/Recipes';
import Personal from './pages/Personal/Personal';

const App: React.FC = () => {
  useQueryParamsStoreInit();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
