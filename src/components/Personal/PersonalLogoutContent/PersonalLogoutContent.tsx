import { useLocalObservable } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Text from 'components/Text/Text';
import createPersonalAppStore from 'configs/store/PersonalStore/PersonalStore';
import style from './style.module.scss';

const PersonalLogoutContent: React.FC = () => {
  const appStore = useLocalObservable(() => new createPersonalAppStore());
  const [loginState, setLoginState] = React.useState('');
  const [passwordState, setPasswordState] = React.useState('');
  const [loginFormatError, setLoginFormatError] = React.useState(false);
  const [passwordFormatError, setPasswordFormatError] = React.useState(false);
  const navigate = useNavigate();

  const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState(event.target.value);
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState(event.target.value);
  };

  const onButtonClick = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(loginState)) {
      setLoginFormatError(true);
    } else {
      setLoginFormatError(false);
      if (passwordState.trim() !== '') {
        appStore.updateData(loginState, passwordState);

        navigate('/personal');
      }
    }

    if (passwordState.trim() === '') {
      setPasswordFormatError(true);
    } else {
      setPasswordFormatError(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onButtonClick();
  };

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleFormSubmit} className={style.input}>
        <Input
          type="email"
          placeholder="Login"
          onChange={onLoginChange}
          value={loginState}
          wrongFormat={loginFormatError}
        />
        {loginFormatError && (
          <Text view="p-14" color="red">
            Некорректный формат ввода
          </Text>
        )}
        <Input
          type="password"
          placeholder="Password"
          onChange={onPasswordChange}
          value={passwordState}
          wrongFormat={passwordFormatError}
        />
        {passwordFormatError && (
          <Text view="p-14" color="red">
            Не должно быть пустым
          </Text>
        )}
        <Button disabled={false} onClick={onButtonClick}>
          Log In
        </Button>
      </form>
    </div>
  );
};

export default PersonalLogoutContent;
