import onRequest from "../utils/axios";

export const getChallengeOngoing = async () =>
  await onRequest({
    method: "GET",
    url: `/challenges/ongoing`,
  });

export const getChallengeHot = async () =>
  await onRequest({
    method: "GET",
    url: `/challenges/hot`,
  });
