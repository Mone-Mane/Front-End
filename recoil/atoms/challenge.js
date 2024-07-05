import { atom } from "recoil";

export const myPageInfoAtom = atom({
  key: "myPageInfoAtom",
  default: null,
});

export const challengeInProgressList = atom({
  key: "challengeInProgressList",
  default: null,
})

export const challengeDoneList = atom({
  key: "challengeDoneList",
  default: null,
})

export const selectedChallengeCode = atom({
  key: "selectedChallengeCode",
  default: null
})
