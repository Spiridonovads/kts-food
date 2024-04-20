import React from 'react';
import { Text } from 'components/Text/Text';

interface RecipeShortTextProps {
  text: string;
  title: string;
}

export const RecipeShortText: React.FC<RecipeShortTextProps> = ({ text, title }) => {
  return (
    <>
      <Text>{title}</Text>
      <Text color="accent" weight="medium">
        {text}
      </Text>
    </>
  );
};
