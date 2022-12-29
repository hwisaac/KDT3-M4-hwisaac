import { atom } from 'recoil';

export const myAtom = atom({
  key: 'myAtom',
  default: { myFn: () => console.log('hello') },
});
