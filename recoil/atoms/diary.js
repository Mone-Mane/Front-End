import { atom } from "recoil";

export const diaryRequest = atom({
  key: "diaryRequest",
  default: { diaryPayments: [], diaryTags: [], diaryConcept: null },
});
