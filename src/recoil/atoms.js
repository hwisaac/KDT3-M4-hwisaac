import { atom } from 'recoil';
import bankbi from '../assets/image/sp_bankbi.png';
export const myAtom = atom({
  key: 'myAtom',
  default: { myFn: () => console.log('hello') },
});

export const bank = atom({
  key: 'bank',
  default: {
    '004': {
      name: 'KB국민은행',
      icon: {
        width: '48px',
        height: '35px',
        backgroundImage: `url(${bankbi})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '-30px -129px',
      },
    },
    '088': { name: '신한은행' },
    '020': { name: '우리은행' },
    '081': { name: '하나은행' },
    '089': { name: '케이뱅크' },
    '090': { name: '카카오뱅크' },
    '011': { name: 'NH농협은행' },
  },
});
