import { action, makeObservable, observable } from 'mobx';

class createPersonalAppStore {
  data: string[] = [];
  constructor() {
    makeObservable(this, {
      data: observable,
      updateData: action,
    });
  }

  updateData(login: string, password: string) {
    this.data.push(login);
    this.data.push(password);
  }
}

export default createPersonalAppStore;
