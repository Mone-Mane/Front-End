import onRequest from "../utils/axios";

export const getChallengesOngoing = async () =>
  await onRequest({
    method: "GET",
    url: `/challenges/ongoing`,
  });

export const getChallengesHot = async () =>
  await onRequest({
    method: "GET",
    url: `/challenges/hot`,
  });

export const getChallengesDone = async () =>
  await onRequest({
    method: "GET",
    url: `/challenges/done`,
  });

export const getChallengesRecentList = async () =>
  await onRequest({
    method: "GET",
    url: `/challenges/recent-list`,
  });

export const getChallengesDetail = async (code) =>
  await onRequest({
    method: "GET",
    url: `/challenges/detail?challengeCode=${code}`,
  });

export const postChallengesInvitation = async (invitationList) =>
  await onRequest({
    method: "POST",
    url: `/challenges/invitation-list`,
    data: {
      invitationList,
    },
  });

export const postChallengesInviteCode = async () =>
  await onRequest({
    method: "POST",
    url: `/challenges/invite-code`,
    data: {},
  });

export const postChallenges = async (challenge) =>{
  console.log("challenge!@#",challenge);
  return await onRequest({
    method: "POST",
    url: `/challenges`,
    data: {
      challengeName: challenge.category,
      challengePeriod: Number(challenge.date.replace("주", ""))*7,
      challengeCategory: challenge.category,
      challengeCost: challenge.cost.replace("원", "").replace(",", ""),
      challengeTargetAmount: challenge.goalAmount,
      challengers: challenge.users.map((user) => user.userCode),
    },
  });
}

export const postChallengesOpening = async () =>
  await onRequest({
    method: "POST",
    url: `/challenges/opening`,
    data: {},
  });

export const findMinimumBalanceUser = async (ids)=>{
  return await onRequest({
    method:"POST",
    url:`/challenges/max-amount`,
    data:{
      ids
    }
  })
}

  
