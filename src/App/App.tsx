import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppStoreProvider } from '../configs/store/AppStoreProvider';
import Header from 'components/Header/Header';
import Recipe from './pages/Recipe/Recipe';
import Recipes from './pages/Recipes/Recipes';

const App: React.FC = () => {
  return (
    <AppStoreProvider>
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
    </AppStoreProvider>
  );
};

export default App;
