import * as React from 'react';
import Input from 'components/Input/Input';
import style from './style.module.scss';

export type PersonalContentProps = {
  appStore: any;
};
const PersonalContent: React.FC<PersonalContentProps> = ({ appStore }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <ul className={style.list}>
          <li className={`${style.activeLi} ${style.li}`}>Personal Data</li>
          <li className={style.li}>Log Out</li>
        </ul>
        {appStore.data && appStore.data.length > 0 && (
          <div className={style.personalData}>
            <Input disabled={true} placeholder={appStore.data[0]} />
            <Input disabled={true} placeholder={appStore.data[1]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalContent;
