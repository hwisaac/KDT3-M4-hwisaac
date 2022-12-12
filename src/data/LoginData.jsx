import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
export const loginState = atom({
  key: 'login',
  default: false,
  effects_UNSTABLE: [persistAtom],
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
  effects_UNSTABLE: [persistAtom],
});
