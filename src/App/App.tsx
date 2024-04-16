import React from 'react';
import Loader from 'components/Loader/Loader';
import Text from 'components/Text/Text';
import Button from 'components/Button/Button';
import ArrowDownIcon from 'components/Icon/ArrowDownIcon/ArrowDownIcon';
import CheckIcon from 'components/Icon/CheckIcon/CheckIcon';

function App() {
  return (
    <>
      <Loader size="l"></Loader>
      <Text>Привет!</Text>
      <Button>Текст</Button>
      <ArrowDownIcon></ArrowDownIcon>
      <CheckIcon></CheckIcon>
    </>
  );
}

export default App;
