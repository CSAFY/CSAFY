import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const Right1Count = atom({
  key: 'Right1Count',
  default: 0,

  effects_UNSTABLE: [persistAtom],
});

export const Right2Count = atom({
  key: 'Right2Count',
  default: 0,

  effects_UNSTABLE: [persistAtom],
});

export const Right3Count = atom({
  key: 'Right3Count',
  default: 0,

  effects_UNSTABLE: [persistAtom],
});

export const Right4Count = atom({
  key: 'Right4Count',
  default: 0,

  effects_UNSTABLE: [persistAtom],
});

export const Right5Count = atom({
  key: 'Right5Count',
  default: 0,

  effects_UNSTABLE: [persistAtom],
});

export const Right6Count = atom({
  key: 'Right6Count',
  default: 0,

  effects_UNSTABLE: [persistAtom],
});
