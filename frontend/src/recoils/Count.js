import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const Count = atom({
  key: 'Count',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
