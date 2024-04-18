import React from 'react';
import { Header } from 'components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Recipes } from './pages/Recipes/Recipes';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/recipes" element={<Recipes />} />
          {/*<Route
            path="*"
            element={
            }
          />*/}
        </Routes>
      </BrowserRouter>
    </>
  );
};
