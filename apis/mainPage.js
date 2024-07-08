import onRequest from "../utils/axios";

export const getUsersMyInfo = async () => {
  return await onRequest({
    method: "GET",
    url: `/users/my-info`,
  });
};

export const getUsersStatistics = async (period) => 
  await onRequest({
    method: "GET",
    url: `/users/statistics/${period}`,
  });

export const getUsersAccount = async () => {
  return await onRequest({
    method: "GET",
    url: `/users/accounts`,
  });
};

export const getMyUser = async()=>{
  const res= await onRequest({
    method:"GET",
    url:`/users/me`
  })
  console.log("MY USER GET~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  return res.data;
}

export const putMyEasId = async(easId)=>{
  return await onRequest({
    method:"PUT",
    url:`/users/eas`,
    data:{
      easId:easId
    }
  })
}
