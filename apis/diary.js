import onRequest from "../utils/axios";

export const getUsersAccountsLogs = async () =>
  await onRequest({
    method: "GET",
    url: `/users/accounts/logs`,
  });

export const getDiaryList = async () =>
  await onRequest({
    method: "GET",
    url: `/diary/list`,
  });

export const getDiaryPaintAgain = async (code) =>
  await onRequest({
    method: "GET",
    url: `/diary?diaryCode=${code}`,
  });

export const getDiaryInfo = async (code) =>
  await onRequest({
    method: "GET",
    url: `/diary/Info?diaryCode=${code}`,
  });

export const postDiaryKeywords = async (keywords) =>
  await onRequest({
    method: "POST",
    url: `/diary/keywords`,
    data: {
      payments: keywords,
    },
  });

  export const postDiary = async (diaryInfo) =>
    await onRequest({
      method: "POST",
      url: `/diary`,
      data: {
        payments: diaryInfo.payments,
        diaryTags: diaryInfo.tags,
        diaryConcept: diaryInfo.concept
      },
    });
