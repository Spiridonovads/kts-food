const API_KEY = 'b16471e6b2a647399fb568019e8a1089';
const BASE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeNutrition=true`;

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
