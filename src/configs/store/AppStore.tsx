export const createAppStore = (props: any) => {
  return {
    recipe: props.recipe,
    setRecipe: function (el: any) {
      this.recipe = el;
    },
  };
};
