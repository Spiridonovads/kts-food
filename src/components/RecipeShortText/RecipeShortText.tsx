import * as React from 'react';
import Text from '../Text/Text';

interface RecipeShortTextProps {
  text: string;
  title: string;
}

const RecipeShortText: React.FC<RecipeShortTextProps> = ({ text, title }) => {
  return (
    <>
      <Text>{title}</Text>
      <Text color="accent" weight="medium">
        {text}
      </Text>
    </>
  );
};

export default RecipeShortText;
