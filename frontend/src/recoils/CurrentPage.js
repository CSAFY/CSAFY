import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const CurrentPage = atom({
  key: 'CurrentPage',
  default: '/',
  effects_UNSTABLE: [persistAtom],
});
