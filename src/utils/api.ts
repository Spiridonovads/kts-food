import { BASE_URL } from 'utils/constants';
import { API_KEY } from 'utils/constants';

export const getData = () => {
  return fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(`${err.message}`);
    });
};

export const getDataIngredient = (id: number) => {
  return fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeNutrition=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(`${err.message}`);
    });
};

export const getDataTypes = (arr: string[]) => {
  return fetch(`${BASE_URL}&type=${arr}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(`${err.message}`);
    });
};

export const getDataQuery = (query: string) => {
  return fetch(`${BASE_URL}&query=${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(`${err.message}`);
    });
};
