import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const TestArray = atom({
  key: 'TestArray',
  default: [
    // { id: 0, choice: 9, category: '' },
    // { id: 1, choice: 9, category: '' },
    // { id: 2, choice: 9, category: '' },
    // { id: 3, choice: 9, category: '' },
    // { id: 4, choice: 9, category: '' },
    // { id: 5, choice: 9, category: '' },
    // { id: 6, choice: 9, category: '' },
    // { id: 7, choice: 9, category: '' },
    // { id: 8, choice: 9, category: '' },
    // { id: 9, choice: 9, category: '' },
    // { id: 10, choice: 9, category: '' },
    // { id: 11, choice: 9, category: '' },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const ChoiceArray = atom({
  key: 'ChoiceArray',
  default: {
    0: 9,
    1: 9,
    2: 9,
    3: 9,
    4: 9,
    5: 9,
    6: 9,
    7: 9,
    8: 9,
    9: 9,
    10: 9,
    11: 9,
  },

  effects_UNSTABLE: [persistAtom],
});

export const ReviewNote = atom({
  key: 'ReviewNote',
  default: [],

  effects_UNSTABLE: [persistAtom],
});

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
