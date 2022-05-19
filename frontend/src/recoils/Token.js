import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const Token = atom({
  key: 'Token',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
