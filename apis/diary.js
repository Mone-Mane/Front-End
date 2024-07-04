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
    url: `/diary/info?diaryCode=${code}`,
  });

  export const getDiaryHot = async () =>
    await onRequest({
      method: "GET",
      url: `/diary/hot`,
    });

export const postDiaryKeywords = async (keywords) =>
  await onRequest({
    method: "POST",
    url: `/diary/keywords`,
    data: {
      payments: keywords,
    },
  });

  export const putDiaryTitle = async (id,title)=>
    await onRequest({
      method:"PUT",
      url:`/diary/title`,
      data:{
        diaryId: id,
        diaryTitle : title
      }
    });

  export const postDiary = async (diaryInfo) =>{
    return await onRequest({
      method: "POST",
      url: `/diary`,
      data: {
        diaryPayments: diaryInfo.diaryPayments,
        diaryTags: diaryInfo.diaryTags,
        diaryConcept: diaryInfo.diaryConcept
      },
    })
    };
