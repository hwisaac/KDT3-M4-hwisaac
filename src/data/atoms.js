import { atom } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../data/API';

export const myAtom = atom({
  key: 'myAtom',
  default: { myFn: () => console.log('hello') },
});
