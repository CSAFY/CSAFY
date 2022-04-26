import { atom, selector } from "recoil";
import { localStorageEffect } from "../utils/localStorageEffect";


export const studyData = atom({
  key: 'studyData',
  default: [],
  effects_UNSTABLE: [localStorageEffect("study_data_token")],
});

export const studyDataToken = selector({
  key: "studyDataToken",
  get: ({ get }) => {
    return get(studyData);
  },
});