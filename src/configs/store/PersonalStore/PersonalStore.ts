import { action, makeObservable } from 'mobx';

class createPersonalAppStore {
  constructor() {
    makeObservable(this, {
      updateData: action,
    });
  }

  updateData(login: string | undefined, password: string | undefined) {
    if (login && password) {
      const user = [login, password];
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }
}

export default createPersonalAppStore;
