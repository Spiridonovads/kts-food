import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from 'components/Header/Header';
import NotFound from 'components/NotFound/NotFound';
import { useQueryParamsStoreInit } from 'configs/store/hooks/useQueryParamsStore';
import Personal from './pages/Personal/Personal';
import Recipe from './pages/Recipe/Recipe';
import Recipes from './pages/Recipes/Recipes';
import Saves from './pages/Saves/Saves';

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
        <Route path="/saves" element={<Saves />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
