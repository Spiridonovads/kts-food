import React from 'react';
import Loader from 'components/Loader/Loader';
import Text from 'components/Text/Text';
import Button from 'components/Button/Button';
import ArrowDownIcon from 'components/Icon/ArrowDownIcon/ArrowDownIcon';
import CheckIcon from 'components/Icon/CheckIcon/CheckIcon';
import Input from 'components/Input/Input';

function App() {
  return (
    <>
      <Loader size="l"></Loader>
      <Text>Привет!</Text>
      <Button>Текст</Button>
      <ArrowDownIcon></ArrowDownIcon>
      <CheckIcon></CheckIcon>
      <Input value="Hi" onChange={() => console.log('Текст')} afterSlot></Input>
    </>
  );
}

export default App;
