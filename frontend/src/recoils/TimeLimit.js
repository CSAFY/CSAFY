import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const TimeLimit = atom({
  key: 'TimeLimit',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
