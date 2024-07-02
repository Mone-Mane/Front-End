import onRequest from "../utils/axios";

export const getUsersAccount = async () =>
  await onRequest({
    method: "GET",
    url: `/users/accounts`,
  });

export const getUsersAccountsLogsPeriod = async (period) =>
  await onRequest({
    method: "GET",
    url: `users/accounts/logs/${period}`,
  });
