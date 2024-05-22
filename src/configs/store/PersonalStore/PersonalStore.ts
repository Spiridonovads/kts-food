import { action, makeObservable, observable } from 'mobx';

class createPersonalAppStore {
  user: string | null = null;
  personalData: string[] | undefined = [];
  savesNumber: number = localStorage.getItem('user') ? localStorage.length - 1 : localStorage.length;
  constructor() {
    makeObservable(this, {
      user: observable,
      personalData: observable,
      savesNumber: observable,
      updateData: action,
      getUser: action,
      getPersonalData: action,
      setSavesInc: action,
      setSavesDec: action,
    });
  }

  updateData(login: string | undefined, password: string | undefined) {
    if (login && password) {
      const user = [login, password];
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.clear();
      this.savesNumber = 0;
      this.user = null;
    }
  }

  getUser() {
    this.user = localStorage.getItem('user');
  }

  getPersonalData() {
    this.personalData = localStorage
      .getItem('user')
      ?.replace(/[\]["]/g, '')
      .split(',');
  }

  setSavesInc() {
    this.savesNumber += 1;
  }

  setSavesDec() {
    this.savesNumber -= 1;
  }
}

export default createPersonalAppStore;
