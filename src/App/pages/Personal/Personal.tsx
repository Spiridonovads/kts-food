import { Observer } from 'mobx-react-lite';
import * as React from 'react';
import PersonalLoginContent from 'components/Personal/PersonalLoginContent/PersonalLoginContent';
import PersonalLogoutContent from 'components/Personal/PersonalLogoutContent/PersonalLogoutContent';

const Personal: React.FC = () => {
  return !localStorage.getItem('user') ? (
    <PersonalLogoutContent />
  ) : (
    <Observer>{() => <PersonalLoginContent />}</Observer>
  );
};

export default Personal;
