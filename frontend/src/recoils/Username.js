import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const Username = atom({
  key: 'Username',
  default: 'Noname',
  effects_UNSTABLE: [persistAtom],
});
