import { atom, selector } from "recoil";
import { localStorageEffect } from "../utils/localStorageEffect";

///
export const keyWordData = atom({
  key: 'keyWordData',
  default: [
    {
      label: '',
      description: ``,
      keywordSeq: null,
      liked: false
    },],
  effects_UNSTABLE: [localStorageEffect("keyWord_data_token")],
});

export const keyWordDataToken = selector({
  key: "keyWordDataToken",
  get: ({ get }) => {
    return get(keyWordData);
  },
});

export const likeKeyWord = atom({
  key: 'likeKeyWord',
  default: [{
    keywordSeq: null,
    liked: false,
    page: 1,
    index: null
  }],
});

export const likeKeyWordToken = selector({
  key: "likeKeyWordToken",
  get: ({ get }) => {
    return get(likeKeyWord);
  },
});

///
export const fourWayRaceData = atom({
  key: 'fourWayRaceData',
  default: [{ 
    question : " ",
    answer : null,
    examples : [" "," "]
    },],
  effects_UNSTABLE: [localStorageEffect("four_way_Race_data_token")],
});

export const fourWayRaceDataToken = selector({
  key: "fourWayRaceDataToken",
  get: ({ get }) => {
    return get(fourWayRaceData);
  },
});

////
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
  default: [
    { 
    explanation : "",
    answer : null,
    word: "",
    },
    
  ],
  effects_UNSTABLE: [localStorageEffect("oxquiz_data_token")],
});

export const oxquizDataToken = selector({
  key: "oxquizDataToken",
  get: ({ get }) => {
    return get(oxquizData);
  },
});
