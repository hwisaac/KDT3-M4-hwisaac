import { atom } from 'recoil';

export const loginState = atom({
  key: 'login',
  default: false,
});

export const userInfoState = atom({
  key: 'userInfo',
  default: {
    user: {
      email: '',
      displayName: '',
      profileImg: '',
    },
    accessToken: '',
  },
});
