import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const viewedListState = atom({
  key: 'recentlyViewed',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
