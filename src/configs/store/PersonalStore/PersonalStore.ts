import { action, makeObservable, observable } from 'mobx';

class createPersonalAppStore {
  data = localStorage.getItem('user');

  constructor() {
    makeObservable(this, {
      data: observable,
      updateData: action,
    });
  }

  async updateData(login: string, password: string) {
    const user = {
      login: login,
      password: password,
    };
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export default createPersonalAppStore;
