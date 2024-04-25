export const createAppStore = (props: any) => {
  return {
    recipe: props.recipe,
    input: props.input ? props.input : 'hello',
    setRecipe: function (el: string) {
      this.recipe = el;
    },
    setInput: function (input: string) {
      this.input = input;
    },
  };
};
