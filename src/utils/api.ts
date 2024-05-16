import { BASE_URL, API_KEY } from 'utils/constants';

export const getData = (query: string | undefined, types: string[], number = 11, offset: number) => {
  return fetch(`${BASE_URL}&query=${query}&type=${types}&number=${number}&offset=${offset}`, {
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
