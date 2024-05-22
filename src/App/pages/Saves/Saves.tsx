import { Observer } from 'mobx-react-lite';
import * as React from 'react';
import SavesContent from 'components/Saves/SavesContent';
import { Data } from 'configs/types';

const Saves: React.FC = () => {
  const savedItems = React.useMemo(() => {
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

    return itemsArray.reduce((acc: Data[], el) => {
      if (itemsSet.has(el.id)) {
        acc.push(el);
        itemsSet.delete(el.id);
      }
      return acc;
    }, []);
  }, []);

  return <Observer>{() => <SavesContent items={savedItems} />}</Observer>;
};

export default Saves;
