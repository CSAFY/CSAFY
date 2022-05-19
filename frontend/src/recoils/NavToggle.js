import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const NavToggle = atom({
  key: 'NavToggle',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
