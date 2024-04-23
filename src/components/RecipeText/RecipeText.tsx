import * as React from 'react';
import style from './style.module.scss';

interface RecipeTextProps {
  htmlString: string;
}

const RecipeText: React.FC<RecipeTextProps> = ({ htmlString }) => {
  return <div className={style.textInfo} dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default RecipeText;
