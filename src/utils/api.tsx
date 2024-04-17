const API_KEY = '409106038fc34644a0141bf9bf97a4fb';
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
