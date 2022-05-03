import { atom, selector } from "recoil";
import { localStorageEffect } from "../utils/localStorageEffect";

///
export const keyWordData = atom({
  key: 'keyWordData',
  default: {},
  effects_UNSTABLE: [localStorageEffect("keyWord_data_token")],
});

export const keyWordDataToken = selector({
  key: "keyWordDataToken",
  get: ({ get }) => {
    return get(keyWordData);
  },
});

///
export const fourWayRaceData = atom({
  key: 'fourWayRaceData',
  default: {},
  effects_UNSTABLE: [localStorageEffect("four_way_wace_data_token")],
});

export const fourWayRaceDataToken = selector({
  key: "fourWayRaceDataToken",
  get: ({ get }) => {
    return get(fourWayRaceData);
  },
});

///
export const shortAnswerData = atom({
  key: 'shortAnswerData',
  default: {},
  effects_UNSTABLE: [localStorageEffect("short_answer_data_token")],
});

export const shortAnswerDataToken = selector({
  key: "shortAnswerDataToken",
  get: ({ get }) => {
    return get(shortAnswerData);
  },
});

///
export const oxquizData = atom({
  key: 'oxquizData',
  default: {},
  effects_UNSTABLE: [localStorageEffect("oxquiz_data_token")],
});

export const oxquizDataToken = selector({
  key: "oxquizDataToken",
  get: ({ get }) => {
    return get(oxquizData);
  },
});