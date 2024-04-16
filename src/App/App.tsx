import React from 'react';
import Loader from 'components/Loader/Loader';
import Text from 'components/Text/Text';
import Button from 'components/Button/Button';
import ArrowDownIcon from 'components/Icon/ArrowDownIcon/ArrowDownIcon';
import CheckIcon from 'components/Icon/CheckIcon/CheckIcon';
import Input from 'components/Input/Input';
import Card from 'components/Card/Card';
import MultiDropdown from 'components/MultiDropDown/MultiDropDown';

function App() {
  let options = [
    { key: 'msk', value: 'Москва' },
    { key: 'spb', value: 'Санкт-Петербург' },
    { key: 'ekb', value: 'Екатеринбург' },
  ];

  return (
    <>
      <Loader size="l"></Loader>
      <Text>Привет!</Text>
      <Button>Текст</Button>
      <ArrowDownIcon></ArrowDownIcon>
      <CheckIcon></CheckIcon>
      <Input value="Hi" onChange={() => console.log('Текст')} afterSlot></Input>
      <Card
        title="Привет"
        subtitle="hello"
        image="https://jepthmagno.files.wordpress.com/2016/10/c558e75b0a834811b2550116d346c19a-800.png"
      ></Card>
      <MultiDropdown
        options={options}
        value={options}
        onChange={() => console.log('Hi')}
        getTitle={() => ''}
      ></MultiDropdown>
    </>
  );
}

export default App;
