import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const Toggle = atom({
  key: 'Toggle',
  default: true,
  effects_UNSTABLE: [persistAtom],
});
