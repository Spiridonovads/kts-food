import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'components/Header/Header';
import Recipe from './pages/Recipe/Recipe';
import Recipes from './pages/Recipes/Recipes';
//import { useAppStoreInit } from 'configs/store/AppStoreInit';

const App: React.FC = () => {
  // useAppStoreInit();
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
