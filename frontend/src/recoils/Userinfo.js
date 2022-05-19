import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const Userinfo = atom({
  key: 'Userinfo',
  default: [
    {
      email: '',
      username: '',
      is_vip: false,
      profile_image: '',
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
