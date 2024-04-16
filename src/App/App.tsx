import React from 'react';
import Loader from 'components/Loader/Loader';
import Text from 'components/Text/Text';
import Button from 'components/Button/Button';

function App() {
  return (
    <>
      <Loader size="l"></Loader>
      <Text>Привет!</Text>
      <Button loading>Текст</Button>
    </>
  );
}

export default App;
