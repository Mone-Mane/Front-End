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

export const postChallengesInvitation = async () =>
  await onRequest({
    method: "POST",
    url: `/challenges/invitation`,
    data: {},
  });

export const postChallengesInviteCode = async () =>
  await onRequest({
    method: "POST",
    url: `/challenges/invite-code`,
    data: {},
  });

export const postChallenges = async (challenge) =>
  await onRequest({
    method: "POST",
    url: `/challenges`,
    data: {
      challengeName: challenge.challengeName,
      challengePeriod: challenge.challengePeriod,
      challengeCategory: challenge.challengeCategory,
      challengeCost: challenge.challengeCost,
      challengeTargetAmount: challenge.challengeTargetAmount,
      challengers: challenge.challengers,
    },
  });

export const postUsersInvitationList = async (userPhoneNumber) =>
  await onRequest({
    method: "POST",
    url: `/users/invitation-list`,
    data: {
      userPhoneNumber: userPhoneNumber,
    },
  });

  export const postChallengesOpening = async () =>
    await onRequest({
      method: "POST",
      url: `/challenges/opening`,
      data:{}
    });

  export const getMyUser = async(master)=>{
    const res= await onRequest({
      method:"GET",
      url:`/users/me`
    })
    if(res.data){
      res.data.master=master;
    }
    return res.data;
  }