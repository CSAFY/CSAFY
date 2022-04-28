import { atom, selector } from "recoil";


export const category = atom({
  key: 'category',
  default: ["전체", "네트워크", "보안", "컴퓨터구조", "웹서비스", "Rma"],
});

export const categoryToken = selector({
  key: "categoryToken",
  get: ({ get }) => {
    return get(category);
  },
});