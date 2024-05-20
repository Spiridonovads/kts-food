import { Data } from 'configs/types';
import { action, makeObservable, observable } from 'mobx';

class createPersonalAppStore {
  user: string | null = null;
  personalData: string[] | undefined = [];
  savedItems: Data[] = [];
  constructor() {
    makeObservable(this, {
      user: observable,
      personalData: observable,
      savedItems: observable,
      updateData: action,
      getUser: action,
      getPersonalData: action,
      getSavedItemsData: action,
    });
  }

  updateData(login: string | undefined, password: string | undefined) {
    if (login && password) {
      const user = [login, password];
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.clear();
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

  getSavedItemsData() {
    const itemsSet = new Set();
    const itemsArray = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)?.toString();
      if (key !== 'user') {
        const value = key && localStorage.getItem(key);
        if (value) {
          itemsArray.push(JSON.parse(value));
        }
      }
    }

    itemsArray.forEach((el) => {
      itemsSet.add(el.id);
    });

    this.savedItems = itemsArray.reduce((acc: Data[], el) => {
      if (itemsSet.has(el.id)) {
        acc.push(el);
        itemsSet.delete(el.id);
      }
      return acc;
    }, []);
  }
}

export default createPersonalAppStore;
