import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const Userinfo = atom({
  key: 'Userinfo',
  default: [
    {
      email: '',
      username: '',
      isVip: false,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
